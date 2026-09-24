import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ["new", "contacted", "qualified", "converted", "lost"],
    default: "new",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Lead", leadSchema);
