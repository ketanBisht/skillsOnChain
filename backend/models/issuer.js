import mongoose from "mongoose";

const issuerSchema = new mongoose.Schema({
  issuerAddress: {
    type: String,
    required: true,
    unique: true
  },
  issuerName: {
    type: String,
    required: true
  },
  isAuthorized: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model("Issuer", issuerSchema);