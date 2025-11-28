import * as admin from "firebase-admin";

import * as path from "node:path";
import * as fs from "node:fs";

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } catch (error) {
    console.error(
      "Failed to parse FIREBASE_SERVICE_ACCOUNT environment variable",
      error
    );
  }
} else {
  const serviceAccountPath = path.resolve(
    __dirname,
    "../../serviceAccountKey.json"
  );
  if (fs.existsSync(serviceAccountPath)) {
    serviceAccount = require(serviceAccountPath);
  }
}

if (!admin.apps.length) {
  if (serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } else {
    console.warn(
      "Firebase service account not found. Firebase Admin SDK not initialized."
    );
  }
}

export default admin;
