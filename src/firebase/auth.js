import { auth } from 'firebase';
import store from '@/store';
import { getDownloadUrl } from './storage';

let signoutTimer = null;

const autoSignout = (expirationTime) => {
  const currentTimeInMilsecs = Date.parse(new Date());
  const expirationTimeInMilsecs = Date.parse(expirationTime);
  const timerInMilsecs = expirationTimeInMilsecs - currentTimeInMilsecs;
  // console.log(Math.floor(timerInMilsecs / 1000 / 60)); // in minutes
  signoutTimer = setTimeout(() => {
    console.log('autoSignout');
    logout();
  }, timerInMilsecs);
};

const onStateChange = () => {
  // Set an authentication state observer and get user data
  auth().onAuthStateChanged(user => {
    console.log('onAuthStateChanged');
    if (user) {
      auth().currentUser.getIdTokenResult()
        .then(res => {
          console.log('res: ', res);
          store.commit('setAuthUser', res);

          localStorage.setItem('token', res.token);
          localStorage.setItem('expirationTime', res.expirationTime); // 1h by default

          getDownloadUrl('/docs/WebDesigner.doc', store);

          autoSignout(res.expirationTime);
        });
    } else {
      store.commit('setDownloadUrl');
    }
  });
};
const login = (payload) => {
  auth().signInWithEmailAndPassword(payload.email, payload.password)
    .then(res => {
      console.log('res: ', res);
    })
    .catch(err => {
      console.log('err: ', err);
    });
};
const logout = () => {
  auth().signOut();
  store.commit('setAuthUser');
  localStorage.removeItem('token');
  localStorage.removeItem('expirationTime');

  if (signoutTimer) {
    clearTimeout(signoutTimer);
    signoutTimer = null;
  }
};

export {
  onStateChange,
  login,
  logout
};