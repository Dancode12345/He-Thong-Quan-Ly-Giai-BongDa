// File hoàn chỉnh: src/pages/NewsDetail.jsx
import { useTournament } from "../context/TournamentContext";

export default function NewsDetail({ newsId }) {
  const { data } = useTournament();

  // Tìm bài viết tương ứng từ dữ liệu Context thông qua newsId nhận từ App.jsx
  const article = data?.news?.find((item) => item.id === newsId);

  // Nếu gõ sai đường dẫn bừa bãi hoặc không tìm thấy bài viết
  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center text-navypro">
        <h2 className="text-xl font-black mb-2">⚠️ Bài viết không tồn tại</h2>
        <a href="#" className="text-sm font-bold text-blue-700 underline">Quay về trang chủ</a>
      </div>
    );
  }

  // Hàm tự động biên dịch ký tự Markdown (** thành thẻ đậm, * thành thẻ nghiêng)
  const renderFormattedContent = (text) => {
    if (!text) return null;
    
    return text.split("\n").map((paragraph, index) => {
      // 1. Xử lý định dạng tô đậm **văn bản**
      let formatted = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="font-black text-slate-950">$1</strong>');
      
      // 2. Xử lý định dạng in nghiêng *văn bản*
      formatted = formatted.replace(/\*(.*?)\*/g, '<em class="italic text-slate-900">$1</em>');

      // Trả về từng đoạn văn đã được bọc thẻ p sạch sẽ
      return (
        <p 
          key={index} 
          className="mb-5 text-slate-800 text-base md:text-lg leading-relaxed font-normal tracking-wide text-justify"
          dangerouslySetInnerHTML={{ __html: formatted }}
        />
      );
    });
  };

  return (
    <div className="bg-chalk min-h-screen pb-20">
      
      {/* THANH ĐIỀU HƯỚNG QUAY LẠI TRANG CHỦ */}
      <div className="max-w-3xl mx-auto px-4 pt-8 mb-6">
        <a 
          href="#" 
          className="inline-flex items-center gap-1.5 text-xs font-black text-slate-400 hover:text-navypro uppercase tracking-widest transition-colors"
        >
          ← Quay lại trang chủ
        </a>
      </div>

      {/* KHỐI HỘP NỀN XÁM BÓNG TRUNG TÂM (GLASSMORPHISM LIGHT) */}
      <div className="max-w-3xl mx-auto mx-4 md:mx-auto bg-slate-100/90 backdrop-blur-md rounded-2xl p-6 md:p-10 shadow-md border border-slate-200/60">
        
        <article>
          {/* Nhãn chuyên mục giải đấu */}
          <span className="inline-block bg-limeflash text-navypro text-[11px] font-black px-2.5 py-1 rounded mb-4 uppercase tracking-wider">
            {article.category}
          </span>

          {/* Tiêu đề bài viết siêu lớn, sắc nét */}
          <h1 className="text-2xl md:text-3xl font-black text-navypro leading-tight tracking-tight mb-4">
            {article.title}
          </h1>

          {/* Thanh thông tin ngày đăng & tác giả */}
          <div className="border-b border-slate-200 pb-4 mb-6 text-xs text-slate-400 font-bold flex items-center gap-2">
            <span>📅 Đăng ngày: {article.createdAt}</span>
            <span>•</span>
            <span className="text-slate-600 uppercase tracking-wide">BAN TRUYỀN THÔNG - THUEN 2026</span>
          </div>

          {/* 🌟 KHU VỰC THÔNG MINH: TỰ ĐỘNG PHÂN CHIA VIDEO HOẶC ẢNH BANNER */}
          {article.videoUrl ? (
            /* BƯỚC 1: Nếu bài viết CÓ trường videoUrl, ưu tiên bật khung phát Video mp4 */
            <div className="w-full rounded-xl overflow-hidden shadow-sm border border-slate-200 mb-8 bg-black">
              <video 
                className="w-full h-auto max-h-[460px] object-contain mx-auto"
                controls
                playsInline
                preload="metadata"
                key={article.videoUrl} // Giúp React reload lại trình phát khi chuyển bài
                poster={article.imageUrl || ""} // Lấy ảnh làm hình nền chờ cho video đỡ trống trải
              >
                <source src={article.videoUrl} type="video/mp4" />
                Trình duyệt không hỗ trợ phát video này.
              </video>
            </div>
          ) : (
            /* BƯỚC 2: Nếu bài viết KHÔNG CÓ videoUrl nhưng CÓ imageUrl -> Hiện ảnh tĩnh bình thường */
            article.imageUrl && (
              <div className="rounded-xl overflow-hidden shadow-sm border border-slate-200/50 mb-8 bg-slate-200">
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="w-full h-auto max-h-[460px] object-cover" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600";
                  }}
                />
              </div>
            )
          )}

          {/* NỘI DUNG VĂN BẢN ĐÃ ĐƯỢC XỬ LÝ NGẮT DÒNG VÀ TO ĐẬM/NGHIÊNG */}
          <div className="prose max-w-none text-slate-800">
            {renderFormattedContent(article.content)}
          </div>

          {/* Chân ký tên bài viết của ban biên tập */}
          <div className="border-t border-slate-200 mt-12 pt-6 text-right italic font-black text-slate-500 text-sm">
            Ban truyền thông BAN TRUYỀN THÔNG - THUEN 2026
          </div>
        </article>

      </div>
    </div>
  );
}