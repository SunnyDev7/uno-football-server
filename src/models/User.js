import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  stats: {
    matchesPlayed: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    draws: { type: Number, default: 0 },
    highestScore: { type: Number, default: 0 },
    unoCallsMade: { type: Number, default: 0 },
    unoPenaltiesReceived: { type: Number, default: 0 },
  },
  lastActive: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: { createdAt: "createdAt", updatedAt: false },
});

// TTL index — auto-delete after 30 days of inactivity
userSchema.index({ lastActive: 1 }, { expireAfterSeconds: 30 * 24 * 60 * 60 });

const User = mongoose.model("User", userSchema);
export default User;
