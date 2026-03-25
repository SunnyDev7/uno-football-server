import mongoose from "mongoose";

const roomPlayerSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  nickname: { type: String, required: true },
  formation: { type: String, default: null },
  isHost: { type: Boolean, default: false },
  connected: { type: Boolean, default: true },
}, { _id: false });

const roomSchema = new mongoose.Schema({
  roomCode: {
    type: String,
    required: true,
    unique: true,
    length: 6,
  },
  status: {
    type: String,
    required: true,
    enum: ["waiting", "in_progress", "completed", "abandoned"],
    default: "waiting",
  },
  players: {
    type: [roomPlayerSchema],
    validate: [arr => arr.length <= 2, "A room can have at most 2 players"],
  },
}, {
  timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
});

roomSchema.index({ status: 1 });
// TTL index — auto-delete rooms after 2 hours
roomSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2 * 60 * 60 });

const Room = mongoose.model("Room", roomSchema);
export default Room;
