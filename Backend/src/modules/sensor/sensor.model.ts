import mongoose from "mongoose";

const schema = new mongoose.Schema({
  deviceId: String,
  humidity: Number,
 tempAHT : Number,
 tempBMP:Number,
    mx:Number,
    my:Number,
    mz:Number,
  time: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("sensorsdatas", schema);
//(collection name, schem name)

/*  "deviceId":"D1",
    "humidity":"11",
    "tempAHT":"34",
    "tempBM":"87",
    "mx":"52",
    "my":"45",
    "mz":"52" */