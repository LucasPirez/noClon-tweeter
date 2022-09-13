const admin = require("firebase-admin");

// const serviceAccount = require("./firebase-keys.json");

try {
  admin.initializeApp({
    credential: admin.credential.cert(process.env.FIREBASE_KEYS),
  });
} catch (error) {
  console.log(error);
}

export const firestore = admin.firestore();
