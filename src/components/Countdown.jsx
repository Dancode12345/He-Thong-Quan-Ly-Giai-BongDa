import { useEffect, useState } from "react";

const getParts = (target) => {
  const diff = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    ngày: Math.floor(diff / 86400000),
    giờ: Math.floor((diff / 3600000) % 24),
    phút: Math.floor((diff / 60000) % 60),
    giây: Math.floor((diff / 1000) % 60)
  };
};

export default function Countdown({ target }) {
  const [parts, setParts] = useState(() => getParts(target));

  useEffect(() => {
    const timer = setInterval(() => setParts(getParts(target)), 1000);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="grid grid-cols-4 gap-2">
      {Object.entries(parts).map(([label, value]) => (
        <div key={label} className="rounded bg-white/12 p-3 text-center ring-1 ring-white/15">
          <span className="block text-2xl font-black text-limeflash md:text-4xl">{String(value).padStart(2, "0")}</span>
          <span className="text-xs font-bold uppercase text-slate-200">{label}</span>
        </div>
      ))}
    </div>
  );
}
