import { useState } from "react";
import { useTournament } from "../context/TournamentContext";

export default function Regulations() {
  const { data } = useTournament();
  const [open, setOpen] = useState(data.regulations[0]?.title);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 lg:px-6">
      <p className="text-sm font-black uppercase text-pitch">Regulations</p>
      <h1 className="text-4xl font-black text-navypro">Điều lệ & Thể lệ</h1>
      <div className="mt-8 overflow-hidden rounded border border-slate-200 bg-white shadow-sm">
        {data.regulations.map((item) => (
          <section key={item.title} className="border-t border-slate-100 first:border-t-0">
            <button className="flex w-full items-center justify-between p-5 text-left font-black text-navypro" onClick={() => setOpen(open === item.title ? "" : item.title)}>
              {item.title}
              <span>{open === item.title ? "-" : "+"}</span>
            </button>
            {open === item.title && <p className="px-5 pb-5 leading-7 text-slate-600">{item.content}</p>}
          </section>
        ))}
      </div>
    </main>
  );
}
