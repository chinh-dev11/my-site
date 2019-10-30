import axios from 'axios';

/*
Firebase Rest API
- Sign up with email / password: /accounts:signUp?key=[API_KEY]
- Sign in with email / password: /accounts:signInWithPassword?key=[API_KEY]

Firebase Project Web API Key: AIzaSyAYn15a51XgUgS7QweQQO-00O7cpyGd47c
 */

const instance = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1'
});

// instance.defaults.headers.post['Content-Type'] = 'application/json';

export default instance;
