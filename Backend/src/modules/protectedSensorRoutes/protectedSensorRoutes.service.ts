import protected_sensorsdatas from "../sensor/sensor.model";

export const getLogsService = async ({deviceid, startdate, enddate,}: any) => {
  const deviceId = deviceid;
  const startMs = new Date(startdate).getTime();
  const endMs = new Date(enddate).getTime();
  const totalDuration = endMs - startMs;
  const MAX_SAMPLES = 1000;

  // Minimum interval required
  const requiredInterval = Math.ceil(totalDuration / MAX_SAMPLES);

  // Allowed intervals
  const intervals = [
    15 * 60 * 1000,          // 15 min
    30 * 60 * 1000,          // 30 min
    60 * 60 * 1000,          // 1 hr
    2 * 60 * 60 * 1000,      // 2 hr
    3 * 60 * 60 * 1000,      // 3 hr
    4 * 60 * 60 * 1000,      // 4 hr
    6 * 60 * 60 * 1000,      // 6 hr
    8 * 60 * 60 * 1000,      // 8 hr
    12 * 60 * 60 * 1000,     // 12 hr
    24 * 60 * 60 * 1000,     // 1 day
    2 * 24 * 60 * 60 * 1000, // 2 day
    3 * 24 * 60 * 60 * 1000, // 3 day
    5 * 24 * 60 * 60 * 1000, // 5 day
    7 * 24 * 60 * 60 * 1000, // 7 day
    15 * 24 * 60 * 60 * 1000,// 15 day
    30 * 24 * 60 * 60 * 1000 // 30 day
  ];

  // Select first interval >= required interval
  let intervalMs = intervals[intervals.length - 1];

  for (const interval of intervals) {
    if (interval >= requiredInterval) {
      intervalMs = interval;
      break;
    }
  }

  console.log({
    totalDurationHours: totalDuration / (1000 * 60 * 60),
    requiredIntervalMinutes: requiredInterval / (1000 * 60),
    selectedIntervalMinutes: intervalMs / (1000 * 60),
    expectedSamples: Math.ceil(totalDuration / intervalMs),
  });

  const logs = await protected_sensorsdatas.aggregate([
    {
      $match: {
        deviceId: String(deviceId),
        time: {
          $gte: new Date(startMs),
          $lt: new Date(endMs),
        },
      },
    },
    {
      $sort: {
        time: 1,
      },
    },
    {
      $addFields: {
        bucket: {
          $floor: {
            $divide: [
              {
                $subtract: [
                  { $toLong: "$time" },
                  startMs,
                ],
              },
              intervalMs,
            ],
          },
        },
      },
    },
    {
      $group: {
        _id: "$bucket",
        doc: { $first: "$$ROOT", },
      },
    },
    {
      $replaceRoot: {
        newRoot: "$doc",
      },
    },
    {
      $sort: {
        time: 1,
      },
    },
  ]);

  return logs;
};