import mongoose from "mongoose";

const cardUsedSchema = new mongoose.Schema({
  type: { type: String, required: true },
  color: { type: String, default: null },
  number: { type: Number, default: null },
  powerType: { type: String, default: null },
}, { _id: false });

const lineupEntrySchema = new mongoose.Schema({
  playerId: { type: String, required: true },
  position: { type: String, required: true },
  slot: { type: String, required: true },
  pickedOnTurn: { type: Number, required: true },
  cardUsed: { type: cardUsedSchema, required: true },
}, { _id: false });

const scoreSchema = new mongoose.Schema({
  averageRating: { type: Number, default: 0 },
  chemistryBonus: { type: Number, default: 0 },
  formationBonus: { type: Number, default: 0 },
  traitBonuses: { type: Number, default: 0 },
  cardPenalties: { type: Number, default: 0 },
  totalScore: { type: Number, default: 0 },
}, { _id: false });

const matchPlayerSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  nickname: { type: String, required: true },
  formation: { type: String, required: true },
  lineup: [lineupEntrySchema],
  score: { type: scoreSchema, default: () => ({}) },
}, { _id: false });

const turnLogSchema = new mongoose.Schema({
  turnNumber: { type: Number, required: true },
  playerId: { type: String, required: true },
  action: {
    type: String,
    required: true,
    enum: ["draw", "play", "pick", "skip", "reverse", "wild", "uno_press", "uno_penalty"],
  },
  cardDrawn: { type: mongoose.Schema.Types.Mixed, default: null },
  playerPicked: { type: String, default: null },
  timestamp: { type: Date, default: Date.now },
}, { _id: false });

const highlightSchema = new mongoose.Schema({
  type: { type: String, required: true },
  description: { type: String, required: true },
  turnNumber: { type: Number, required: true },
}, { _id: false });

const matchSchema = new mongoose.Schema({
  roomCode: {
    type: String,
    required: true,
  },
  players: {
    type: [matchPlayerSchema],
    required: true,
  },
  winner: {
    type: String, // sessionId or "draw"
    default: null,
  },
  turnLog: [turnLogSchema],
  highlights: [highlightSchema],
  duration: {
    type: Number, // seconds
    default: 0,
  },
  completedAt: {
    type: Date,
    default: null,
  },
});

matchSchema.index({ roomCode: 1 });
matchSchema.index({ "players.sessionId": 1 });
matchSchema.index({ completedAt: 1 });

const Match = mongoose.model("Match", matchSchema);
export default Match;
