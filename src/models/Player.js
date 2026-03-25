import mongoose from "mongoose";

const POSITIONS = [
  "GK", "CB", "LB", "RB", "LWB", "RWB",
  "CDM", "CM", "CAM", "LM", "RM",
  "LW", "RW", "CF", "ST",
];

const POSITION_CATEGORIES = ["GK", "DEF", "MID", "FWD"];

const playerSchema = new mongoose.Schema({
  playerId: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
    enum: POSITIONS,
  },
  positionCategory: {
    type: String,
    required: true,
    enum: POSITION_CATEGORIES,
  },
  rating: {
    type: Number,
    required: true,
    min: 68,
    max: 99,
  },
  nationality: {
    type: String,
    required: true,
  },
  league: {
    type: String,
    required: true,
  },
  club: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 17,
    max: 40,
  },
  traits: {
    type: [String],
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  isRealPlayer: {
    type: Boolean,
    required: true,
    default: false,
  },
});

// Compound index for querying by position category + rating
playerSchema.index({ positionCategory: 1, rating: -1 });
playerSchema.index({ league: 1 });
playerSchema.index({ nationality: 1 });

const Player = mongoose.model("Player", playerSchema);
export default Player;
