// File hoàn chỉnh: src/components/TeamCard.jsx
export default function TeamCard({ team }) {
  return (
    <a 
      href={`#/teams/${team.id}`} 
      className="group overflow-hidden rounded border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-glow"
    >
      {/* KHUNG ẢNH BANNER CHỨA LOGO THU NHỎ */}
      <div className="relative h-44 bg-slate-900 flex items-center justify-center p-2">
        
        {/* Logo được thu nhỏ lại, dùng object-contain để vừa vặn với khung hình */}
        <img 
          src={team.logo} 
          alt={team.name} 
          className="h-full w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105" 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=150";
          }}
        />
        
        {/* Lớp phủ shadow tối mờ nhẹ ở đáy để làm nổi bật chữ trắng */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent pointer-events-none" />
        
        {/* Nhãn tên viết tắt của đội bóng */}
        <span 
          className="absolute left-4 top-4 rounded px-3 py-1 text-xs font-black text-navypro shadow" 
          style={{ backgroundColor: team.color }}
        >
          {team.shortName}
        </span>
        
        {/* Tên đội bóng hiển thị rõ nét ở góc dưới */}
        <h3 className="absolute bottom-4 left-4 right-4 text-2xl font-black text-white drop-shadow-md">
          {team.name}
        </h3>
      </div>

      {/* THÔNG TIN SỐ LƯỢNG CẦU THỦ DƯỚI ĐÁY */}
      <div className="flex items-center justify-between p-4">
        <span className="text-sm font-semibold text-slate-500">
          {team.players && team.players.length > 0 
            ? `${team.players.length} cầu thủ đăng ký` 
            : "0 cầu thủ đăng ký"}
        </span>
        <span className="text-sm font-black text-pitch group-hover:text-ember transition-colors">
          Xem đội
        </span>
      </div>
    </a>
  );
}