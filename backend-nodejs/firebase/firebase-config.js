//import firebase
import admin from 'firebase-admin';
import serviceAccount from '../serviceAccountKey.json' assert { type: "json" }; // Replace with your actual path


// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'her-ai-a4653.appspot.com' // Replace with your bucket name
  });
  
  const bucket = admin.storage().bucket();
  
export default bucket;
  