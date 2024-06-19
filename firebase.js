const admin = require('firebase-admin');
const serviceAccount = require('./firebaseServiceAccount.json'); // Ensure this path is correct

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'storage-for-attendance.appspot.com' // Use your Firebase Storage bucket name
});

const bucket = admin.storage().bucket();

module.exports = bucket;
