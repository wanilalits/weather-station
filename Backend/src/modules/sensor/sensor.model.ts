import mongoose from "mongoose";

const schema = new mongoose.Schema({
  deviceId: String,
  humidity: Number,
  time: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("sensorsdatas", schema);
//(collection name, schem name)