import React, { useEffect, useMemo, useState } from 'react';
import { Droplets, Gauge, Clock3, Wifi, RadioTower, Server, Monitor } from 'lucide-react';
import type { RootState } from '../features/store';
import { useSelector } from 'react-redux';
import { getUTCtoLocalSyatemDate } from '../utils/formatDate';
import './Card.css';
type SocketColour = '-1' | '0' | '1';
type SocketStatus = {
  colour: SocketColour;
  status: any;
  remote: any;
};

const Card: React.FC = () => {
  const [weatherCode, setWeatherCode] = useState<number | null>(null);
  const [isDay, setIsDay] = useState(true);
  const [time, setTime] = useState(new Date());
  const [socketStatus, setSocketStatus] = useState<SocketStatus>({
    colour: '-1',
    status: 'Disconnect',
    remote: 'stationStatus Not Connected, receiving random data',
  });

  const deviceData = useSelector((state: RootState) => state.device);

  const latestSample = deviceData?.devices1?.[1]?.at(-1);
  const latestUtcTime = deviceData?.devices?.[1]?.[0]?.utcTime;

  const formattedLastUpdated = useMemo(() => {
    if (!latestUtcTime) return '';
    return getUTCtoLocalSyatemDate(latestUtcTime);
  }, [latestUtcTime]);

  function getWeatherEmoji(code: number | null, isDay: boolean) {
    if (code === null) return '🌥️';

    switch (code) {
      case 0:
        return isDay ? '☀️' : '🌙';

      case 1:
      case 2:
        return isDay ? '🌤️' : '☁️';

      case 3:
        return isDay ? '☁️' : '☁️';

      case 45:
      case 48:
        return isDay ? '🌫️' : '🌫️';

      case 51:
      case 53:
      case 55:
        return isDay ? '🌦️' : '🌦️';

      case 61:
      case 63:
      case 65:
        return isDay ? '🌧️' : '🌧️';

      case 71:
      case 73:
      case 75:
        return isDay ? '❄️' : '❄️';

      case 95:
        return isDay ? '⛈️' : '⛈️';

      default:
        return '🌥️';
    }
  }

  const weatherIcon = getWeatherEmoji(weatherCode, isDay);
  
   
  useEffect(() => {
    const updateTime = () => setTime(new Date());
    updateTime();
    const now = new Date();
    const delay = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      updateTime();
      interval = setInterval(updateTime, 60000);
    }, delay);

    async function loadWeather() {
      const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=18.5204&longitude=73.8567&current=weather_code,is_day');

      const data = await res.json();

      setWeatherCode(data.current.weather_code);
      setIsDay(Boolean(data.current.is_day));
    }

    loadWeather();

    const timer = setInterval(loadWeather, 30 * 60 * 1000);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, []);
  useEffect(() => {

//console.log('📡 Socket Status Updated:', deviceData.socketStatus)
    // console.log('📡 Socket Status Updated:', deviceData.devices1?.[1]?.at(-1)?.rssi);

    if (deviceData.socketStatus?.stationStatus === 'Connected and Sending Data' && deviceData.socketStatus?.status === 'Connected') {
      setSocketStatus((prev) => ({ ...prev, colour: '1', status: deviceData.socketStatus.status, remote: deviceData.socketStatus.stationStatus }));
    } else if (deviceData.socketStatus?.stationStatus === 'Not Connected, receiving random data' && (deviceData.socketStatus?.status === 'Offline' || deviceData.socketStatus?.status === 'Disconnected')) {
      //Offline, Disconnected
      setSocketStatus((prev) => ({ ...prev, colour: '-1', status: deviceData.socketStatus.status, remote: deviceData.socketStatus.stationStatus }));
    } else if (deviceData.socketStatus?.stationStatus === 'Not Connected, receiving random data' && deviceData.socketStatus?.status === 'Connected') {
      setSocketStatus((prev) => ({ ...prev, colour: '0', status: deviceData.socketStatus.status, remote: deviceData.socketStatus.stationStatus }));
    } else {
      setSocketStatus((prev) => ({ ...prev, status: deviceData.socketStatus.status, remote: deviceData.socketStatus.stationStatus }));
    }
  }, [deviceData]);

  const statusStyles = socketStatus.colour === '1' ? 'bg-emerald-400 shadow-emerald-400/40 ' : socketStatus.colour === '0' ? 'bg-slate-200 shadow-slate-200/30' : 'bg-rose-500 shadow-rose-500/40';

  const statusLabel = socketStatus.colour === '1' ? 'Live' : socketStatus.colour === '0' ? 'Idle' : 'Offline';

  return (
    <div className="w-full max-w-[380px] overflow-hidden rounded-2xl bg-gradient-to-br from-[#024f66] via-[#007498] to-[#0492a7] p-4 text-white shadow-xl ring-1 ring-white/15">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium uppercase tracking-wide text-white/90">Maharashtra, India</p>
          <p className="mt-1 text-sm text-white/90">
            📅
            {time.toLocaleString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })}
          </p>
        </div>
<div >
        <div className="flex shrink-0 items-center gap-2 rounded-full bg-white/12 px-3 py-1.5 text-xs font-medium text-white/90 ring-1 ring-white/15">
          <span className={`h-2.5 w-2.5 rounded-full shadow-md ${statusStyles}`} /> <span>{statusLabel}</span>
    </div>
    <span className="flex shrink-0 items-center gap-2 rounded-full bg-white/12 px-3 py-1.5 text-xs font-normal text-white/75 " > { deviceData.socketStatus.connectedClients} watching</span>

    </div>
    
      </div>

      <div className="mt-2 flex items-center gap-0">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center text-5xl align-left -ml-3">
          <span >{weatherIcon}</span>
        </div>

        <div className="min-w-0">
          <p  className="text-lg font-medium text-white/95">Current Temperature</p>

          <div className="mt-1 flex items-end">
            <span className="text-5xl font-semibold leading-none tabular-nums">{String(Number(latestSample?.tempAHT ?? 27).toFixed(1)).split('.')[0]}.</span>

            <span className="text-3xl font-semibold leading-none text-white/70 tabular-nums">{String(Number(latestSample?.tempAHT ?? 27).toFixed(1)).split('.')[1]}</span>

            <div className="ml-0 flex flex-col self-start leading-none">
              <span className="text-4xl font-semibold">°C</span>
            </div>
          </div>
        </div>
      </div>
{/* Humidity + Air Pressure */}
      <div className="mt-4 grid grid-cols-2 gap-6">
       <div className="rounded-xl p-1 ring-2 ring-white/15">
  <div className="flex items-start gap-3">
    <div className="flex h-full items-center"><Droplets size={23}  mt-3 className="text-cyan-300  mt-3  " /></div>
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-white/65">Humidity</p>
{/*         <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-300">↑ 1.2%</span> */}
      </div>
      <p className="mt-1 flex items-center gap-1 text-lg font-semibold ">
        <span className="tabular-nums text-cyan-100">{latestSample?.humidity ?? 48}</span>
        <span className="text-sm text-white/70">%</span>
      </p>
    </div>
  </div>
</div>

      <div className="rounded-xl p-1 ring-2 ring-white/15">
  <div className="flex items-start gap-3">
    {/* Icon */}
    <div className="flex items-center">
      <Gauge size={22} className="text-yellow-300 mt-3 " />
    </div>

    {/* Content */}
    <div className="flex-1">
      <p className="text-xs font-medium text-white/65">
        Air Pressure
      </p>

      <p className="mt-1 flex items-center gap-1 text-lg font-semibold">
        <span className="tabular-nums text-yellow-300">
          {latestSample?.pressure ?? 824}
        </span>

        <span className="text-sm text-white/70">
          hPa
        </span>
      </p>
    </div>
  </div>
</div>    
      </div>

      {/* Connection Status */}

      <div className="mt-3 border-t border-white/10 pt-2">
        <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-white/60">Socket Connection Status</h3>

        <div className="flex items-center justify-between align-middle ">
          {/* Client */}
          <div className="flex w-[95px] flex-col items-center rounded-xl bg-white/8 py-2 ring-1 ring-white/10">
            <div className="flex items-center gap-2">
           
            
                     { socketStatus.status === "Connected"? 
<>   <div className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500">✓</div>
              <Monitor size={18} className="text-white/90" /></>
    :
       <> <div className="h-4 w-4 rounded-full bg-rose-500"></div>
              <Monitor size={18} className="text-white/90" /></>
}
            
            </div>
            <p className="mt-2 text-[11px] font-medium">Client</p>
                  { socketStatus.status === "Connected"? 
    <p className="text-[10px] text-emerald-300"> Online </p>
    :
       <p className="text-[10px] text-rose-300"> Offline </p>
}
          </div>

          {/* Line */}
       
<div className="relative flex-1 h-[2px] overflow-hidden rounded-full bg-white/10">
  <div
    className={`absolute inset-0 w-[200%]  ${
      socketStatus.status === "Connected"
        ? "animate-lineMove bg-[linear-gradient(90deg,transparent,transparent,#34d399,transparent,transparent)]"
        : " animate-lineMoverevrce bg-[linear-gradient(90deg,transparent,transparent,#ef4444,transparent,transparent)]"
    }`}
  />
</div>
          {/* Server */}
          <div className="flex w-[95px] flex-col items-center rounded-xl bg-white/8 py-2 ring-1 ring-white/10">
            <div className="flex items-center gap-2">
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500">✓</div>
              <Server size={18} className="text-white/90" />
            </div>
            <p className="mt-2 text-[11px] font-medium"> Socket Server </p>
            { socketStatus.status === "Connected"? 
    <p className="text-[10px] text-emerald-300"> Online </p>
    :
       <p className="text-[10px] text-rose-300"> Online </p>
}
          </div>

          {/* Line */}

<div className="relative flex-1 h-[2px] overflow-hidden rounded-full bg-white/10">
  <div
    className={`absolute inset-0 w-[200%]  ${
      socketStatus.remote === "Connected and Sending Data"
        ? "animate-lineMove bg-[linear-gradient(90deg,transparent,transparent,#34d399,transparent,transparent)]"
        : " animate-lineMoverevrce bg-[linear-gradient(90deg,transparent,transparent,#ef4444,transparent,transparent)]"
    }`}
  />
</div>

          {/* Station */}

          <div className="flex w-[95px] flex-col items-center rounded-xl bg-white/8 px-0 py-2 ring-1 ring-white/10">
            <div className="flex items-center gap-2">
                                { socketStatus.remote === 'Connected and Sending Data'?  
<>   <div className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500">✓</div>
              <RadioTower size={18} className="text-white/90" /></>
    :
       <> <div className="h-4 w-4 rounded-full bg-rose-500"></div>
              <RadioTower size={18} className="text-white/90" /></>
}
            </div>




            
            <p className="mt-2 text-[11px] font-medium"> Weather Station </p>
 { socketStatus.remote === 'Connected and Sending Data'? <p className="text-[10px] text-emerald-300"> Online </p>:<p className="text-[10px] text-rose-300"> Offline </p>}
          </div>
        </div>
      </div>

      {/* Footer */}

      <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2 text-[11px] text-white/70">
     
        <div className="flex items-center gap-2"><Wifi size={13} />{' '}
        <span>{' '}Weather Station Signal: {Math.max(0,Math.min(100, 2 * (Number(deviceData.devices1?.[1]?.at(-1)?.rssi ?? -100) + 100)))}%

          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock3 size={13} /> <span>{formattedLastUpdated ?? ''}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;

/*  <div className="mt-2 border-t border-white/15 pt-0">
        <p className="m-1 ml-0 text-xs font-medium uppercase tracking-wide text-white/60"> Socket Status</p>

        <div className="flex items-center   font-semibold  whitespace-nowrap align-middle -mt-2 justify-between">
          <span className={`text-[13px] ${socketStatus.status === 'Connected' ? 'text-emerald-300' : 'text-rose-300'}`}>Client</span>
          <span className="relative  text-white/45 text-[20px]">↔</span>
          <span className={`text-[13px] ${socketStatus.status === 'Connected' ? 'text-emerald-300' : 'text-rose-300'}`}>Socket Server</span>
          <span className="relative  text-white/45 text-[20px]">↔</span>
          <span className={`text-[13px] ${socketStatus.remote === 'Connected and Sending Data' ? 'text-emerald-300' : 'text-rose-300'}`}>Weather Station</span>
        </div>
        <div className="mt-1  text-xs text-white/70">
          <p>⏱Last Updated at {formattedLastUpdated ?? ''}</p>
          <p>Remote Weather Station: {socketStatus.remote}</p>
        </div>
      </div> */
