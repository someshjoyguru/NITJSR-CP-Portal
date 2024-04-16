import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  codeforces: {
    type: String,
    unique: [true, "Codeforces handle already exists"],
  },
  codeforcesRating: {
    type: String,
    default: "0",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  }
});

export const LeaderboardUser = mongoose.model("LeaderboardUser", schema);
