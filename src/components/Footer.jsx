export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-navypro text-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:grid-cols-[1.4fr_1fr_1fr] lg:px-6">
        <div>
          <p className="text-lg font-black text-limeflash">BAN TRUYỀN THÔNG - THUEN</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
            Cổng thông tin vận hành giải đấu bóng đá trẻ trung, minh bạch và luôn cập nhật theo thời gian thực.
          </p>
        </div>
        <div>
          <p className="font-bold">Liên hệ BTC</p>
          <p className="mt-2 text-sm text-slate-300">Email: bantruyenthongpaleithuen@gmail.com</p>
          <p className="text-sm text-slate-300">Hotline: 0352603631</p>
        </div>
        {/* <div>
          <p className="font-bold">Màu giải đấu</p>
          <div className="mt-3 flex gap-2">
            {["bg-pitch", "bg-turf", "bg-limeflash", "bg-ember", "bg-skyline"].map((color) => (
              <span key={color} className={`h-7 w-7 rounded ${color}`} />
            ))}
          </div>
        </div> */}
      </div>
    </footer>
  );
}
