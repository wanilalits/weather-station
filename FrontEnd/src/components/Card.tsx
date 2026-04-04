import React from 'react'
import AreaChart from './AreaChart';;
import { useState } from 'react';
import humidityIcon from '../assets/Images/humidity.svg';
import temperatureIcon from '../assets/Images/temperature.svg';

export default function Card() {
   const [sensorValue, setSensorValue] = useState<{
      [key: string]: number;
    }>({
      Temperature: 10,
      Humidity: 50,
      'Air pressure': 540,
      Altitude: 50,
    });
  
    const [convertedValues, setConvertedValues] = useState<{
      [key: string]: any;
    }>({});
    const [id, setID] = useState<number | null>(null);
  
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
  
    const myConvertion = (title: string, value: number) => {
      if (title === 'Temperature') {
        return (Number(sensorValue.Temperature) * 9) / 5 + 32;
      } else {
        return null;
      }
    };
  
    const formatNumber = (num: number | string): number | string => {
      const truncated = Math.floor(Number(num) * 10) / 10;
      return Number.isInteger(truncated) ? truncated : truncated.toString();
    };
  
  
    return (
   <>
     
            {/* Cards */}
        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-4 py-4">
          {[
            {
              title: 'Temperature',
              value: sensorValue.Temperature,
              units: ['°C', '°F'],
             Icon: temperatureIcon,
            },
            {
              title: 'Real Feel',
              value: 16.2,
              units: ['°C', '°F' ],
            },
            {
              title: 'Humidity',
              value: 8,
      
              units: ['%'],
            },
            {
              title: 'Air pressure',
              value: 16.2,
      
              units: ['hPa', 'kPa'],
            },
            {
              title: 'Altitude',
              value: 16.2,
    
              units: ['m', 'F'],
            },
            
          ].map((card, i) => {
            const Icon = card.Icon;
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
                              convertedValues[card.title] && i == 1
                                ? 'text-black font-bold cursor-auto'
                                : !convertedValues[card.title] && i == 0
                                  ? 'text-black font-bold cursor-auto'
                                  : ''
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
                  <h2 className="text-3xl font-semibold ">
                    {' '}
                    {convertedValues[card.title] ? <> {myConvertion(card.title, card.value)} </> : <>{formatNumber(card.value)}</>}
                  </h2>
                  <AreaChart />
                </div>
              </div>
            );
          })}
        </div>
        </>
  )
}
