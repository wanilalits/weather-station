import protected_sensorsdatas from '../sensor/sensor.model';
export const getLogsService = async ({ deviceid, limit, startdate, enddate }: any) => {
    const deviceId = deviceid;
    let startDateValue = startdate;
    let enddateValue = enddate;
    let limitValue = limit;
 if (!limitValue || limitValue > 100) {
        limitValue = 100;
    }

const startMs = new Date(startDateValue).getTime();
const endMs = new Date(enddateValue).getTime();
const intervalMs = (endMs - startMs) / limitValue;


//const filter = { deviceId: String(deviceId), time: { $gte: startDateValue, $lt: enddateValue, }, };
 //const logs = await protected_sensorsdatas .find(filter) .sort({ time: -1 }) .limit(limitValue);
const logs = await protected_sensorsdatas.aggregate([
  {
    $match: {
      deviceId: String(deviceId),
      time: {
        $gte: new Date(startMs),
        $lt: new Date(endMs)
      }
    }
  },
  {
    $sort: {
      time: 1
    }
  },
  {
    $addFields: {
      bucket: {
        $floor: {
          $divide: [
            {
              $subtract: [
                { $toLong: "$time" },
                startMs
              ]
            },
            intervalMs
          ]
        }
      }
    }
  },
  {
    $group: {
      _id: "$bucket",
      doc: { $first: "$$ROOT" } // or $last
    }
  },
  {
    $replaceRoot: {
      newRoot: "$doc"
    }
  },
  {
    $sort: {
      time: 1
    }
  }
]);

 return logs.reverse(); // oldest to newest
};


