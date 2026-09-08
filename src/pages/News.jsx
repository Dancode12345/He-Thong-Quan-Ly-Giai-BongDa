// File: src/pages/News.jsx
import { useTournament } from "../context/TournamentContext";

export default function News() {
  const { data } = useTournament();

  // Phòng hờ trường hợp dữ liệu context chưa được khởi tạo xong
  if (!data || !data.news) {
    return <div className="text-center py-20 text-navypro font-bold">Đang tải bảng tin...</div>;
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <p className="text-sm font-black uppercase text-pitch">News</p>
      <h1 className="text-4xl font-black text-navypro">Tin tức</h1>
      
      {/* Lưới hiển thị danh sách tin tức */}
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {data.news.map((article) => (
          <article 
            key={article.id} 
            className="flex flex-col overflow-hidden rounded border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 group"
          >
            {/* Bọc thẻ <a> bọc toàn bộ nội dung Card - bấm vào bất cứ đâu (ảnh, chữ) cũng chuyển trang */}
            <a href={`#/news/${article.id}`} className="flex flex-col flex-1 cursor-pointer">
              
              {/* Khung chứa ảnh - Đã chỉnh nhỏ lại xíu thành h-48 cho sang và cân đối tỷ lệ */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-300" 
                  
                  // 🌟 TỰ ĐỘNG THAY ẢNH NỀN DỰ PHÒNG NẾU LINK ẢNH GỐC BỊ CHẾT (DIE LINK)
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=60";
                  }}
                />
              </div>

              {/* Khối hiển thị văn bản */}
              <div className="flex flex-col flex-1 p-5">
                <div className="flex-grow">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded bg-limeflash px-2 py-1 text-xs font-black text-navypro">
                      {article.category}
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      {article.createdAt}
                    </span>
                  </div>

                  {/* Tiêu đề bài viết giới hạn 2 dòng và gán chiều cao tối thiểu để cố định khung form */}
                  <h2 className="mt-3 text-xl font-black text-navypro leading-tight group-hover:text-blue-700 transition-colors line-clamp-2 min-h-[56px]">
                    {article.title}
                  </h2>

                  {/* Ép nội dung chữ tóm tắt về đúng 3 dòng tăm tắp bằng line-clamp-3 */}
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
                    {article.content}
                  </p>
                </div>

                {/* Đường link trang trí nhận diện ở đáy Card */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end text-xs font-black text-blue-700 group-hover:text-blue-900 transition-colors uppercase tracking-wider items-center gap-1">
                  Xem thêm
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </div>

            </a>
          </article>
        ))}
      </div>
    </main>
  );
}