import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: ["user", "issuer", "verifier", "admin"],
    required: true
  }
});

export default mongoose.model("User", userSchema);