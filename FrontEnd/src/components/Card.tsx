import React, { useEffect, useRef } from 'react';
import AreaChart from './AreaChart';
import { useState } from 'react';
import temperatureIcon from '../assets/Images/temperature.svg';
import humidityIcon from '../assets/Images/humidity.svg';
import batteryIcon from '../assets/Images/battery.svg';
import airPressureIcon from '../assets/Images/airPressure.svg';
import realFeeIcon from '../assets/Images/realFee.svg';
import altitudeIcon from '../assets/Images/altitude.svg';

import { useSelector } from 'react-redux';
export default function Card() {
  type RootState = {
    specificdevices: {
      [key: string]: string | number | null;
    }[];
  };

  type DeviceData = {
    deviceId: string;
    humidity?: string;
    mx?: string;
    my?: string;
    mz?: string;
    pressure?: string;
    tempAHT?: string;
    tempBMP?: string;
    // allow extra fields like battery
    [key: string]: string | undefined;
  };

  const [data, setData] = useState<RootState>({ specificdevices: [] });
  const [selected, setSelected] = useState<string>('');
  const samplesRef = useRef<DeviceData[]>([]);
  const lastValueRef = useRef<string | null>(null);
  const devices = useSelector((state: any) => state.device.devices);
  const [sensorValue] = useState<{
    [key: string]: number;
  }>({
    Temperature: 10,
    Humidity: 50,
    'Air pressure': 540,
    Altitude: 50,
    'Real Feel' :10
  });

  const cardData = [
    {
      title: 'Temperature',
      value: samplesRef.current?.length > 0 && samplesRef.current[samplesRef.current.length - 1].tempAHT,
      units: ['°C', '°F'],
      Icon: temperatureIcon,
    },
    {
      title: 'Real Feel',
      value:     samplesRef.current?.length &&
  samplesRef.current[samplesRef.current.length - 1]?.tempAHT != null &&
  samplesRef.current[samplesRef.current.length - 1]?.humidity != null
    ? (() => {
        const t = Number(samplesRef.current[samplesRef.current.length - 1].tempAHT);
        const rh = Number(samplesRef.current[samplesRef.current.length - 1].humidity);

        // 👉 If hot (Heat Index)
        if (t >= 27 && rh >= 40) {
          const T = t * 9/5 + 32;
          const HI =
            -42.379 +
            2.04901523 * T +
            10.14333127 * rh -
            0.22475541 * T * rh -
            0.00683783 * T * T -
            0.05481717 * rh * rh +
            0.00122874 * T * T * rh +
            0.00085282 * T * rh * rh -
            0.00000199 * T * T * rh * rh;

          return (HI - 32) * 5/9;
        }

        // 👉 If cold (Wind Chill approx, assuming light wind ~1.5 m/s)
        if (t <= 10) {
          const v = 5.4; // km/h (~1.5 m/s default)
          return (
            13.12 +
            0.6215 * t -
            11.37 * Math.pow(v, 0.16) +
            0.3965 * t * Math.pow(v, 0.16)
          );
        }

        // 👉 Otherwise normal temp
        return t;
      })()
    : 2,
        units: ['°C', '°F'],
        Icon: realFeeIcon,
    },
    {
      title: 'Humidity',
      value: samplesRef.current?.length > 0 && samplesRef.current[samplesRef.current.length - 1].humidity,
      units: ['%'],
      Icon: humidityIcon,
    },
    {
      title: 'Air pressure',
      value: samplesRef.current?.length > 0 && samplesRef.current[samplesRef.current.length - 1].pressure,
      units: ['hPa', 'kPa'],
      Icon: airPressureIcon,
    },
    {
      title: 'Altitude',
      value: 
  samplesRef.current?.length &&
  samplesRef.current[samplesRef.current.length - 1]?.pressure != null &&
  samplesRef.current[samplesRef.current.length - 1]?.tempAHT != null
    ? ((Number(samplesRef.current[samplesRef.current.length - 1].tempAHT) + 273.15) /
        0.0065) *
      (1 -
        Math.pow(
          Number(samplesRef.current[samplesRef.current.length - 1].pressure) /
            1013.25,
          0.1903
        ))
    : 3,

      units: ['m', 'F'],
      Icon: altitudeIcon,
    },
  ];

  useEffect(() => {
    const newData = devices['1']?.[0];
    if (!newData) return;
    const uniqueKey = JSON.stringify(newData);
    // 🚫 skip duplicate
    if (lastValueRef.current === uniqueKey) return;
    lastValueRef.current = uniqueKey;
    addSample(newData);
  }, [devices]);

  function addSample(newData: DeviceData) {
    samplesRef.current.push(newData);

    if (samplesRef.current.length > 15) {
      samplesRef.current.shift();
    }
    console.log(samplesRef.current[samplesRef.current.length - 1]);
  }

  const [convertedValues, setConvertedValues] = useState<{
    [key: string]: any;
  }>({});
  //const [id, setID] = useState<number | null>(null);

  const unitFormat = (id: number, parameter: string) => {
    if (id === 0) {
      setConvertedValues((prev) => {
        console.log(id);
        const { [parameter]: _, ...rest } = prev;
        return rest;
      });
    }

    if (id === 1) {
      setConvertedValues((prev) => ({
        ...prev,
        [parameter]: true,
      }));
    }
  };

  const myConvertion = (title: string) => {
    if (title === 'Temperature' || title==='Real Feel') {
      return (Number(sensorValue[title]) * 9) / 5 + 32;
    } else {
      return null;
    }
  };

  const formatNumber = (num: number | string | false | undefined): number | string => {
    if (num === false || num === undefined) {
      return '';
    }
    const truncated = Math.floor(Number(num) * 10) / 10;
    return Number.isInteger(truncated) ? truncated : truncated.toString();
  };

  return (
    <>
      {/* Cards */}

      <select value={selected} onChange={(e) => setSelected(e.target.value)}>
        {data.specificdevices.map((d, index) => (
          <option key={index} value={String(d.deviceId)}>
            {String(d.deviceId)}
          </option>
        ))}
      </select>

      <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-4 py-4">
        {cardData.map((card, i) => {
          // const Icon = card.Icon;
          return (
            <div key={i} className="bg-white p-2 rounded-xl shadow h-24 ">
              {/*Card Title*/} {/* UNITS CONTAINER */}
              <div className="flex items-center text-sm w-full justify-between text-black">
                <div className="flex items-center gap-2">
                  <img src={card.Icon} className="w-5 h-5" /> {card.title}
                </div>
                <div className="flex items-center gap-0">
                  {' '}
                  {/* 👈 smaller gap */}
                  {card.units.map((unit, i) => {
                    return (
                      <>
                        <span
                          className={`ml-auto cursor-pointer  ${
                            convertedValues[card.title] && i == 1 ? 'text-black font-bold cursor-auto' : !convertedValues[card.title] && i == 0 ? 'text-black font-bold cursor-auto' : ''
                          }`}
                          onClick={() => {
                            unitFormat(i, card.title);
                          }}
                        >
                          {unit}
                        </span>
                        {/* Divider (avoid after last item) */}
                        {i !== card.units.length - 1 && <span className="mx-2 h-4 border-l border-gray-400"></span>}
                      </>
                    );
                  })}
                </div>
              </div>
              {/* VALUE */}
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-semibold "> {convertedValues[card.title] ? <> {myConvertion(card.title)} </> : <>{formatNumber(card.value)}</>}</h2>
                <AreaChart />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

