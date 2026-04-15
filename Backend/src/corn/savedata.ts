import {latestData} from  "../websocket/wsServer"
import Sensor from '../modules/sensor/sensor.model';

export const saveData= async()=>{
   if (latestData.length === 0) {
      console.log('No data to save');
      return;
    }
    const batch = [...latestData]
    //console.log(batch)
    latestData.length = 0; // clear buffer
    try {
      await Sensor.insertMany(batch);
      console.log(`✅ Saved ${batch.length} records to DB`);
    } catch (error: any) {
      console.error('❌ Error saving data:', error.message);
    }
  }