// File: src/components/StandingTable.jsx
import React from "react";

export default function StandingTable({ standings = [] }) {
  // 🌟 Hàm vẽ bảng thô (Đã lược bỏ hoàn toàn phần tiêu đề cứng lồng bên trong)
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm w-full">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-navypro text-xs uppercase text-white">
            <tr>
              <th className="px-4 py-3 text-center w-12">#</th>
              <th className="px-4 py-3">Đội bóng</th>
              <th className="px-4 py-3 text-center">ST</th>
              <th className="px-4 py-3 text-center">T</th>
              <th className="px-4 py-3 text-center">H</th>
              <th className="px-4 py-3 text-center">B</th>
              <th className="px-4 py-3 text-center">BT/BB</th>
              <th className="px-4 py-3 text-center">H/S</th>
              <th className="px-4 py-3 text-center">Điểm</th>
            </tr>
          </thead>
          <tbody>
            {standings.length > 0 ? (
              standings.map((row, index) => (
                <tr key={row.teamId || row.id} className="border-t border-slate-100 odd:bg-slate-50/70 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-center font-black text-slate-500">{index + 1}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img 
                        src={row.logo} 
                        alt="" 
                        className="h-9 w-9 rounded object-cover border border-slate-200 bg-slate-100" 
                        onError={(e) => { e.target.src = "https://via.placeholder.com/36"; }}
                      />
                      <span className="font-black text-navypro">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center font-bold text-slate-700">{row.played ?? 0}</td>
                  <td className="px-4 py-3 text-center font-bold text-pitch">{row.won ?? 0}</td>
                  <td className="px-4 py-3 text-center font-bold text-slate-500">{row.drawn ?? 0}</td>
                  <td className="px-4 py-3 text-center font-bold text-ember">{row.lost ?? 0}</td>
                  <td className="px-4 py-3 text-center font-bold text-slate-600">
                    {row.goalsFor ?? 0}/{row.goalsAgainst ?? 0}
                  </td>
                  <td className="px-4 py-3 text-center font-bold text-slate-700">
                    {(row.goalDifference ?? 0) > 0 ? `+${row.goalDifference}` : row.goalDifference ?? 0}
                  </td>
                  <td className="px-4 py-3 text-center text-lg font-black text-navypro bg-slate-50/50">{row.points ?? 0}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-8 font-medium text-slate-400">
                  Chưa có dữ liệu đội bóng nào ở bảng này.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}