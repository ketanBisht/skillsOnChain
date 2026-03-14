import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  tokenId: {
    type: Number,
    required: true,
    unique: true
  },
  skillName: {
    type: String,
    required: true
  },
  metadataURI: {
    type: String,
    required: true
  },
  isRevoked: {
    type: Boolean,
    default: false
  },
  ownerWallet: {
    type: String,
    required: true
  },
  issuerAddress: {
    type: String,
    required: true
  }
});

export default mongoose.model("Skill", skillSchema);