import mongoose from "mongoose";

const verificationLogSchema = new mongoose.Schema({
  verifierWallet: {
    type: String,
    required: true
  },
  tokenId: {
    type: Number,
    required: true
  },
  verificationResult: {
    type: String,
    enum: ["valid", "revoked", "invalid"],
    required: true
  },
  verifiedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("VerificationLog", verificationLogSchema);