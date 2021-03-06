import { database } from 'firebase';

const _writeUserData = (contact) => {
  /*
    - Firebase Database constraint: Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]""
      - Converting dots (.) in email address into '%'
  */
  // const emailAddConverted = (contact.email).replace(/\./g, '+');
  // console.log('emailAddConverted: ', emailAddConverted);
  // const contactsRef = database().ref('/contacts/' + emailAddConverted);

  // ./src/functions/index.js: exports.sendingMail = functions.database.ref('/contacts/{pushId}')
  const contactsRef = database().ref('/contacts').push(); // auto-generate unqiue key

  return new Promise((resolve, reject) => {
    contactsRef
      .set({
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        message: contact.message
      }, err => {
        // debugger;
        if (err) {
          // console.log('TLC: 1_writeUserData -> err', err);
          // reject(Error(err));
          reject(err);
        } else {
          // console.log('TLC: 2_writeUserData -> SUCCESS');
          resolve('write SUCCESS');
        }
      })
      .catch(err => {
        // console.log('TLC: 3_writeUserData -> err', err);
        reject(err);
      });
  });
};

export {
  _writeUserData
};
