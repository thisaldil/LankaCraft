const admin = require("firebase-admin");

const serviceAccount = require("../firebase-service-account.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const verifyFirebaseToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.customerEmail = decoded.email; // ✅ Attach email
    next();
  } catch (err) {
    console.error("Firebase auth failed:", err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyFirebaseToken;
