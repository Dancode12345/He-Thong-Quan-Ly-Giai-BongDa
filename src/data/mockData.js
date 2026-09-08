export const initialTournamentData = {
  tournament: {
    name: "Báo Lá Cải - Thuen 2026",
    organizer: "Ban tổ chức Báo Lá Cải - Thuen",
    venue: "Sân bóng Báo Lá Cải - Thuen",
    season: "Hè 2026"
  },
  teams: [
    // ===== CÁC ĐỘI BẢNG A =====
    {
      id: "k23",
      name: "Khóa 23",
      shortName: "K23",
      logo: "/logodoi/K23.jpg", // Khớp file K23.jpg
      color: "#17A964",
      group: "A",
      players: []
    },
    {
      id: "k24",
      name: "Khóa 24",
      shortName: "K24",
      logo: "/logodoi/K24.jpg", // Khớp file K24.jpg
      color: "#22D3EE",
      group: "A",
      players: []
    },

    // ===== CÁC ĐỘI BẢNG B =====
    {
      id: "K15",
      name: "Khóa 15",
      shortName: "K15",
      logo: "/logodoi/K15.jpg", // Khớp file K15.jpg
      color: "#C7F92F",
      group: "A",
      players: []
    },
    {
      id: "K22",
      name: "Khóa 22",
      shortName: "K22",
      logo: "/logodoi/K22.jpg", // Khớp file K22.jpg
      color: "#A855F7",
      group: "B",
      players: []
    },
    {
      id: "CSV",
      name: "Cựu Sinh Viên",
      shortName: "CSV",
      logo: "/logodoi/CSV.jpg", // Khớp file CSV.jpg
      color: "#EC4899",
      group: "B",
      players: []
    },
    {
      id: "LQ10-11",
      name: "LQ 10-11",
      shortName: "LQ10-11",
      logo: "/logodoi/LQ10-11.jpg",
      color: "#10B981",
      group: "B",
      players: []
    },
    {
      id: "k8",
      name: "Khóa 8",
      shortName: "K8",
      logo: "/logodoi/K8.jpg",
      color: "#F59E0B",
      group: "A",
      players: []
    },
    {
      id: "k25",
      name: "Khóa 25",
      shortName: "K25",
      logo: "/logodoi/K25.jpg",
      color: "#2563EB",
      group: "B",
      players: []
    },
    {
      id: "fcThanhNien",
      name: "FC Thanh Niên",
      shortName: "FTN",
      logo: "/logodoi/FTN.jpg",
      color: "#DC2626",
      group: "A",
      players: []
    },
    {
      id: "fcQuaDen",
      name: "FC Quạ Đen",
      shortName: "FQD",
      logo: "/logodoi/QD.jpg",
      color: "#7C3AED",
      group: "B",
      players: []
    }
  ],
  matches: [
    { id: "m1", round: "Ngày 12 (Chủ Nhật) - Bảng A", homeTeamId: "k24", awayTeamId: "k23", kickoff: "2026-07-12T14:00:00+07:00", status: "finished", homeScore: 4, awayScore: 2, hot: true, scorers: [{ name: "Văn Vượt", number: 10, teamId: "k24", minute: 10, goals: 2, goalType: "Bàn" }, { name: "Phôn", number: 5, teamId: "k24", minute: 5, goals: 1, goalType: "Bàn" }, { name: "Thanh Thời", number: 17, teamId: "k24", minute: 17, goals: 1, goalType: "Bàn" }, { name: "Đại Thuật", number: 17, teamId: "k23", minute: 17, goals: 1, goalType: "Bàn" }, { name: "Văn Long", number: 10, teamId: "k23", minute: 10, goals: 1, goalType: "Bàn" }], cards: [], starPlayer: { name: "Thanh Thời", team: "Khóa 24", image: "/players/thoik24k23.jpg" }, highlightVideo: "/players/HLK23K24.mp4", highlightPoster: "/gallery/20nam.jpg" },
    { id: "m2", round: "Ngày 12 (Chủ Nhật) - Bảng A", homeTeamId: "fcThanhNien", awayTeamId: "k8", kickoff: "2026-07-12T16:00:00+07:00", status: "finished", homeScore: 5, awayScore: 1, hot: false, scorers: [{ name: "Hoàng", number: 8, teamId: "fcThanhNien", minute: 8, goals: 2, goalType: "Bàn" }, { name: "Văn Sơn", number: 21, teamId: "fcThanhNien", minute: 21, goals: 1, goalType: "Bàn" }, { name: "Hiển", number: 20, teamId: "fcThanhNien", minute: 20, goals: 1, goalType: "Bàn" }, { name: "Nguyên", number: 3, teamId: "fcThanhNien", minute: 3, goals: 1, goalType: "Bàn" }, { name: "Lý", number: 10, teamId: "k8", minute: 10, goals: 1, goalType: "Bàn" }], cards: [], starPlayer: { name: "Anh Quốc", team: "FC Thanh Niên", image: "/players/quoctnk8.jpg" }, highlightVideo: "/players/HLTNK8.mp4", highlightPoster: "/gallery/20nam.png" },

    { id: "m3", round: "Ngày 13 (Thứ Hai) - Bảng B", homeTeamId: "k25", awayTeamId: "fcQuaDen", kickoff: "2026-07-13T14:00:00+07:00", status: "finished", homeScore: 2, awayScore: 5, hot: false, scorers: [{ name: "Đan Trường", number: 23, teamId: "k25", minute: 23, goals: 1, goalType: "Bàn" }, { name: "Hữu Kiệt", number: 7, teamId: "k25", minute: 7, goals: 1, goalType: "Bàn" }, { name: "Trực", number: 22, teamId: "fcQuaDen", minute: 22, goals: 1, goalType: "Bàn" }, { name: "An", number: 9, teamId: "fcQuaDen", minute: 9, goals: 1, goalType: "Bàn" }, { name: "Đức", number: 26, teamId: "fcQuaDen", minute: 26, goals: 1, goalType: "Bàn" }, { name: "Đình", number: 19, teamId: "fcQuaDen", minute: 19, goals: 1, goalType: "Bàn" }, { name: "Lương", number: 14, teamId: "fcQuaDen", minute: 14, goals: 1, goalType: "Bàn" }], cards: [], starPlayer: { name: "Thành Lương", team: "FC Quạ Đen", image: "/players/luongqdk25.jpg" }, highlightVideo: "/gallery/highlight3.mp4", highlightPoster: "/gallery/20nam.jpg" },
    { id: "m4", round: "Ngày 13 (Thứ Hai) - Bảng B", homeTeamId: "CSV", awayTeamId: "LQ10-11", kickoff: "2026-07-13T16:00:00+07:00", status: "finished", homeScore: 2, awayScore: 6, hot: false, scorers: [{ name: "Huy", number: 15, teamId: "CSV", minute: 15, goals: 1, goalType: "Bàn" }, { name: "Triển", number: 4, teamId: "CSV", minute: 4, goals: 1, goalType: "Bàn" }, { name: "Châu Linh Thiện", number: 4, teamId: "LQ10-11", minute: 4, goals: 3, goalType: "Bàn" }, { name: "Truyền", number: 86, teamId: "LQ10-11", minute: 86, goals: 2, goalType: "Bàn" }, { name: "Phát", number: 95, teamId: "LQ10-11", minute: 95, goals: 1, goalType: "Bàn" }, { name: "Hoá", number: 8, teamId: "LQ10-11", minute: 8, goals: 1, goalType: "Bàn" }], cards: [{ name: "Hằng", teamId: "LQ10-11", minute: 77, type: "yellow" }, { name: "Mẫn", teamId: "LQ10-11", minute: 8, type: "yellow" }], starPlayer: { name: "Linh Thiện", team: "LQ 10-11", image: "/players/tuk10k25.jpg" }, highlightVideo: "/gallery/highlight4.mp4", highlightPoster: "/gallery/20nam.png" },

    { id: "m5", round: "Ngày 14 (Thứ Ba) - Bảng A", homeTeamId: "fcThanhNien", awayTeamId: "K15", kickoff: "2026-07-14T14:00:00+07:00", status: "finished", homeScore: 1, awayScore: 1, hot: false, scorers: [{ name: "Hên", number: 58, teamId: "fcThanhNien", minute: 58, goals: 1, goalType: "Bàn" }, { name: "Tại", number: 25, teamId: "K15", minute: 25, goals: 1, goalType: "Bàn" }], cards: [], starPlayer: { name: "Anh Quốc", team: "FC Thanh Niên", image: "/players/quock15tn.jpg" }, highlightVideo: "/gallery/highlight5.mp4", highlightPoster: "/gallery/20nam.jpg" },
    { id: "m6", round: "Ngày 14 (Thứ Ba) - Bảng A", homeTeamId: "k24", awayTeamId: "k8", kickoff: "2026-07-14T16:00:00+07:00", status: "finished", homeScore: 2, awayScore: 1, hot: false, scorers: [{ name: "Doãn", number: 20, teamId: "k24", minute: 20, goals: 1, goalType: "Bàn" }, { name: "Trọng", number: 99, teamId: "k24", minute: 99, goals: 1, goalType: "Bàn" }, { name: "Toản", number: 18, teamId: "k8", minute: 18, goals: 1, goalType: "Bàn" }], cards: [{ name: "Lanh", teamId: "k24", number: 66, type: "yellow" }], starPlayer: { name: "Văn Vượt", team: "Khóa 24", image: "/players/vuotk24k8.jpg" }, highlightVideo: "/gallery/highlight6.mp4", highlightPoster: "/gallery/20nam.png" },

    { id: "m7", round: "Ngày 15 (Thứ Tư) - Bảng B", homeTeamId: "LQ10-11", awayTeamId: "K22", kickoff: "2026-07-15T14:00:00+07:00", status: "finished", homeScore: 6, awayScore: 0, hot: false, scorers: [{ name: "Vin", number: 7, teamId: "LQ10-11", minute: 7, goals: 5, goalType: "Bàn" }, { name: "Không Bốn", number: 4, teamId: "LQ10-11", minute: 4, goals: 1, goalType: "Bàn" }], cards: [], starPlayer: { name: "Vin", team: "LQ 10-11", image: "/players/vink1022.jpg" }, highlightVideo: "/gallery/highlight7.mp4", highlightPoster: "/gallery/20nam.jpg" },
    { id: "m8", round: "Ngày 15 (Thứ Tư) - Bảng B", homeTeamId: "k25", awayTeamId: "CSV", kickoff: "2026-07-15T16:00:00+07:00", status: "finished", homeScore: 7, awayScore: 4, hot: false, scorers: [{ name: "Ngọc Thái", number: 10, teamId: "k25", minute: 10, goals: 1, goalType: "Bàn" }, { name: "Hải Kiệt", number: 17, teamId: "k25", minute: 17, goals: 1, goalType: "Bàn" }, { name: "Hữu Kiệt", number: 17, teamId: "k25", minute: 17, goals: 1, goalType: "Bàn" }, { name: "Quốc Cường", number: 27, teamId: "k25", minute: 27, goals: 1, goalType: "Bàn" }, { name: "Đan Trường", number: 23, teamId: "k25", minute: 23, goals: 1, goalType: "Bàn" }, { name: "Thái Hiện", number: 25, teamId: "k25", minute: 25, goals: 1, goalType: "OG" }, { name: "Vững", number: 79, teamId: "k25", minute: 79, goals: 1, goalType: "OG" }, { name: "Ven", number: 86, teamId: "CSV", minute: 86, goals: 2, goalType: "Bàn" }, { name: "Triển", number: 17, teamId: "CSV", minute: 17, goals: 1, goalType: "Bàn" }, { name: "Ngọc Thơ", number: 10, teamId: "CSV", minute: 10, goals: 1, goalType: "Bàn" }], cards: [], starPlayer: { name: "Hữu Kiệt", team: "Khóa 25", image: "/players/denk25csv.jpg" }, highlightVideo: "/gallery/highlight8.mp4", highlightPoster: "/gallery/20nam.png" },

    { id: "m9", round: "Ngày 16 (Thứ Năm) - Bảng A", homeTeamId: "k24", awayTeamId: "fcThanhNien", kickoff: "2026-07-16T14:00:00+07:00", status: "finished", homeScore: 0, awayScore: 1, hot: false,scorers: [{ name: "Hiển", number: 63, teamId: "fcThanhNien", minute: 4, goals: 1, goalType: "Bàn" }], cards: [{ name: "Hoàng", teamId: "fcThanhNien", minute: 48, type: "yellow" },{ name: "Thanh Thời", teamId: "k24", minute: 67, type: "yellow"},],starPlayer: { name: "Hiển", team: "Thanh Niên Fc", image: "/players/hientnk24.jpg" }, highlightVideo: "/gallery/highlight7.mp4", highlightPoster: "/gallery/20nam.jpg" },
    { id: "m10", round: "Ngày 16 (Thứ Năm) - Bảng A", homeTeamId: "K15", awayTeamId: "k23", kickoff: "2026-07-16T16:00:00+07:00", status: "finished", homeScore: 0, awayScore: 2  , hot: false,scorers: [{ name: "Đại Thuật", number: 17, teamId: "k23", minute: 4, goals: 1, goalType: "Bàn" }, { name: "Khang", number: 63, teamId: "k23", minute: 4, goals: 1, goalType: "Bàn" },], cards: [],starPlayer: { name: "Đại Thuật", team: "Khóa 23", image: "/players/bonk23k15.jpg" }, highlightVideo: "/gallery/highlight7.mp4", highlightPoster: "/gallery/20nam.jpg" },

    { id: "m11", round: "Ngày 17 (Thứ Sáu) - Bảng B", homeTeamId: "k25", awayTeamId: "LQ10-11", kickoff: "2026-07-17T14:00:00+07:00", status: "finished", homeScore: 1, awayScore: 3, hot: false, scorers: [{ name: "Đan Trường", number: 23, teamId: "k25", minute: null, goals: 1, goalType: "Bàn" }, { name: "Vin", number: 7, teamId: "LQ10-11", minute: null, goals: 3, goalType: "Bàn" }], cards: [], starPlayer: { name: "Vin", team: "LQ 10-11", image: "/players/vin1025.jpg" }, highlightVideo: "/gallery/highlight8.mp4", highlightPoster: "/gallery/20nam.jpg" },
    { id: "m12", round: "Ngày 17 (Thứ Sáu) - Bảng B", homeTeamId: "K22", awayTeamId: "fcQuaDen", kickoff: "2026-07-17T16:00:00+07:00", status: "finished", homeScore: 1, awayScore: 1, hot: false, scorers: [{ name: "Quyết", number: 7, teamId: "K22", minute: null, goals: 1, goalType: "Bàn" }, { name: "Trực", number: 22, teamId: "fcQuaDen", minute: null, goals: 1, goalType: "Bàn" }], cards: [{ name: "Sư", teamId: "fcQuaDen", minute: null, type: "yellow" }, { name: "Chí", teamId: "fcQuaDen", minute: null, type: "yellow" }], starPlayer: { name: "Phú Văn Quyết", team: "LQ 10-11", image: "/players/quyetk22qd.jpg" }, highlightVideo: "/gallery/highlight9.mp4", highlightPoster: "/gallery/20nam.jpg" },

    { id: "m13", round: "Ngày 18 (Thứ Bảy) - Bảng A", homeTeamId: "k8", awayTeamId: "k23", kickoff: "2026-07-18T14:00:00+07:00", status: "finished", homeScore: 1, awayScore: 9, hot: false, scorers: [{ name: "Thừa", number: 17, teamId: "k8", minute: null, goals: 1, goalType: "Bàn" }, { name: "Long", number: 10, teamId: "k23", minute: null, goals: 1, goalType: "Bàn" }, { name: "Lợi", number: 8, teamId: "k23", minute: null, goals: 1, goalType: "Bàn" }, { name: "Huyện", number: 23, teamId: "k23", minute: null, goals: 3, goalType: "Bàn" }, { name: "Đại Thuật", number: 17, teamId: "k23", minute: null, goals: 4, goalType: "Bàn" }], cards: [], starPlayer: { name: "Đại Thuật", team: "Khoá 23", image: "/players/bon238.jpg" }, highlightVideo: "/players/k8k23.mp4", highlightPoster: "/players/k8k23.jpg" },
    { id: "m14", round: "Ngày 18 (Thứ Bảy) - Bảng A", homeTeamId: "K15", awayTeamId: "k24", kickoff: "2026-07-18T16:00:00+07:00", status: "finished", homeScore: 0, awayScore: 7, hot: false, scorers: [{ name: " Văn Vượt", number: 10, teamId: "k24", minute: null, goals: 1, goalType: "Bàn" }, { name: "Phôn", number: 6, teamId: "k24", minute: null, goals: 1, goalType: "Bàn" }, { name: "Tùng  (OG)", number: null, teamId: "k24", minute: null, goals: 1, goalType: "Phản lưới" }, { name: "Khiêm", number: 28, teamId: "k24", minute: null, goals: 1, goalType: "Bàn" }, { name: "Doãn", number: 24, teamId: "k24", minute: null, goals: 1, goalType: "Bàn" }], cards: [], starPlayer: { name: "Thành Lương", team: "Khoá 24", image: "/players/quat.jpg" }, highlightVideo: "/players/k15k24.mp4", highlightPoster: "/players/k15k24.mp4" },

    { id: "m15", round: "Ngày 19 (Chủ Nhật) - Bảng A", homeTeamId: "CSV", awayTeamId: "fcQuaDen", kickoff: "2026-07-19T14:00:00+07:00", status: "finished", homeScore: 1, awayScore: 2, hot: false, scorers: [{ name: "Thiện", number: null, teamId: "CSV", minute: null, goals: 1, goalType: "Bàn" }, { name: "Đình", number: null, teamId: "fcQuaDen", minute: null, goals: 1, goalType: "Bàn" }, { name: "An", number: null, teamId: "fcQuaDen", minute: null, goals: 1, goalType: "Bàn" }], cards: [], starPlayer: { name: "La Dong Min", team: "FC Quạ Đen", image: "/players/minqdcsv.jpg" }, highlightVideo: "/gallery/highlight15.mp4", highlightPoster: "/gallery/poster15.jpg" },
    { id: "m16", round: "Ngày 19 (Chủ Nhật) - Bảng A", homeTeamId: "K22", awayTeamId: "k25", kickoff: "2026-07-19T16:00:00+07:00", status: "finished", homeScore: 4, awayScore: 2, hot: false, scorers: [{ name: "Trung Kiên", number: 22, teamId: "K22", minute: null, goals: 2, goalType: "Bàn" }, { name: "Kiêu", number: 5, teamId: "K22", minute: null, goals: 1, goalType: "Bàn" }, { name: "Quyết", number: 7, teamId: "K22", minute: null, goals: 1, goalType: "Bàn" }, { name: "Quốc Hy", number: 30, teamId: "k25", minute: null, goals: 1, goalType: "Bàn" }, { name: "Khánh", number: 16, teamId: "k25", minute: null, goals: 1, goalType: "Bàn" }], cards: [{ name: "Thanh Tuyến", number: 16, teamId: "K22", type: "yellow" }], starPlayer: { name: "Trung Kiên", team: "Khoá 22", image: "/players/kienk22k25.jpg" }, highlightVideo: "/gallery/highlight16.mp4", highlightPoster: "/gallery/poster16.jpg" },

    { id: "m17", round: "Ngày 20 (Thứ Hai) - Bảng A", homeTeamId: "k8", awayTeamId: "K15", kickoff: "2026-07-20T14:00:00+07:00", status: "finished", homeScore: 3, awayScore: 0, hot: false, scorers: [], cards: [], starPlayer: null, highlightVideo: null, highlightPoster: null },
    { id: "m18", round: "Ngày 20 (Thứ Hai) - Bảng A", homeTeamId: "k23", awayTeamId: "fcThanhNien", kickoff: "2026-07-20T16:00:00+07:00", status: "finished", homeScore: 2, awayScore: 3, hot: false, scorers: [{ name: "Khang", number: 68, teamId: "k23", minute: null, goals: 1, goalType: "Bàn" }, { name: "Đại Thuật", number: 17, teamId: "k23", minute: null, goals: 1, goalType: "Bàn" }, { name: "Nguyên", number: 3, teamId: "fcThanhNien", minute: null, goals: 1, goalType: "Bàn" }, { name: "Hên", number: 11, teamId: "fcThanhNien", minute: null, goals: 1, goalType: "Bàn" }, { name: "Tiên", number: 9, teamId: "fcThanhNien", minute: null, goals: 1, goalType: "Bàn" }], cards: [], starPlayer: { name: "Tiên", team: "FC Thanh Niên", image: "/players/default.jpg" }, highlightVideo: "/gallery/highlight18.mp4", highlightPoster: "/gallery/poster18.jpg" },

    { id: "m19", round: "Ngày 21 (Thứ Ba) - Bảng B", homeTeamId: "CSV", awayTeamId: "K22", kickoff: "2026-07-21T14:00:00+07:00", status: "finished", homeScore: 2, awayScore: 5, hot: false, scorers: [{ name: "Thầy Hy", number: 71, teamId: "CSV", minute: null, goals: 1, goalType: "Bàn" }, { name: "Xuân Luân", number: 79, teamId: "CSV", minute: null, goals: 1, goalType: "Bàn" }, { name: "Như", number: 16, teamId: "K22", minute: null, goals: 3, goalType: "Bàn" }, { name: "Quyết", number: 7, teamId: "K22", minute: null, goals: 2, goalType: "Bàn" }], cards: [], starPlayer: { name: "Như", team: "Khoá 22", image: "/players/nhu22csv.jpg" }, highlightVideo: "/gallery/highlight19.mp4", highlightPoster: "/gallery/poster19.jpg" },
    { id: "m20", round: "Ngày 21 (Thứ Ba) - Bảng B", homeTeamId: "fcQuaDen", awayTeamId: "LQ10-11", kickoff: "2026-07-21T16:00:00+07:00", status: "finished", homeScore: 3, awayScore: 3, hot: false, scorers: [{ name: "Đình", number: null, teamId: "fcQuaDen", minute: null, goals: 2, goalType: "Bàn" }, { name: "An", number: null, teamId: "fcQuaDen", minute: null, goals: 1, goalType: "Bàn" }, { name: "Vin", number: null, teamId: "LQ10-11", minute: null, goals: 2, goalType: "Bàn" }, { name: "Sóng 86", number: null, teamId: "LQ10-11", minute: null, goals: 1, goalType: "Bàn" }], cards: [], starPlayer: { name: "Đình", team: "FC Quạ Đen", image: "/players/vin10qd.jpg" }, highlightVideo: "/players/lq10qd.mp4", highlightPoster: "/players/lq10qd.mp4" },
  
    { id: "m21", round: "Bán Kết 1 - Ngày 23 (Thứ Năm)", homeTeamId: "fcThanhNien", awayTeamId: "fcQuaDen", kickoff: "2026-07-23T14:00:00+07:00", status: "scheduled", homeScore: null, awayScore: null, hot: true, scorers: [], cards: [] },
    { id: "m22", round: "Bán Kết 2 - Ngày 23 (Thứ Năm)", homeTeamId: "LQ10-11", awayTeamId: "k24", kickoff: "2026-07-23T16:00:00+07:00", status: "scheduled", homeScore: null, awayScore: null, hot: true, scorers: [], cards: [] },

  ],
  news: [
    {
      id: "n5",
      title: "K22 nhận thất bại trong trận ra quân trước K10–11",
      content: "Trận đấu mở màn tại giải Chi hội TN–HS–SV Palei Thuen 2026, Khoá 22 đã phải đối đầu với thử thách cực lớn mang tên K10–11 – đội bóng giàu thành tích của giải đấu. Dù thi đấu với tinh thần quyết tâm và không bỏ cuộc, K22 vẫn phải chấp nhận thất bại với tỉ số 0-6.\n\nTrước một đối thủ dày dạn kinh nghiệm và có tổ chức tốt, đây là trận đấu mang lại nhiều bài học quý giá cho tập thể trẻ của K22. Điểm tích cực là toàn đội vẫn giữ được tinh thần thi đấu đến những phút cuối cùng và đang dần hoàn thiện lối chơi dưới thời HLV Triet Romano.\n\nThất bại là một phần của hành trình. K22 sẽ trở lại mạnh mẽ hơn ở những trận đấu tiếp theo.",
      imageUrl: "/gallery/k1022.jpg",
      createdAt: "2026-07-16"
    },
    {
      id: "n1",
      title: "HÀNH TRÌNH 20 NĂM – MỘT CHẶNG ĐƯỜNG ĐÁNG TỰ HÀO!",
      content: "20 năm không chỉ là một con số. Đó là quãng thời gian đủ để một đứa trẻ sinh ra, lớn lên và hôm nay trở thành một phần của chính Chi Hội Thanh niên – Học sinh – Sinh Viên Palei Thuen.\n\nSuốt hành trình ấy, biết bao thế hệ anh chị đi trước đã âm thầm vun đắp, tạo nên một sân chơi lành mạnh, gắn kết và đầy ý nghĩa cho thanh thiếu niên Palei Thuen. Xin gửi lời tri ân sâu sắc đến tất cả những người đã góp sức xây dựng nên hành trình đẹp đẽ này.\n\n**Mùa hè 2026 đánh dấu cột mốc đặc biệt – Kỷ niệm 20 năm thành lập Chi Hội.**\n\nNhân dịp này, Chi Hội sẽ tổ chức chuỗi hoạt động đặc biệt gồm *Trại hè truyền thống* và *Đêm Văn nghệ Kỷ niệm 20 năm* với nhiều chương trình ý nghĩa và đáng nhớ.\n\nNhững ngày qua, Ban Tổ chức rất vui khi thấy các khóa đã chủ động kết nối, chuẩn bị và háo hức hướng về mùa hè năm nay qua những Facebook page. Đó chính là nguồn động viên lớn để chúng tôi tiếp tục cố gắng mang đến một chương trình thật trọn vẹn.\n\nThân mời tất cả anh chị em các khóa, từ khóa 98 đến các Khoá hiện tại, cùng trở về Palei để gặp gỡ, sẻ chia và viết tiếp câu chuyện đẹp của hoạt động Hè truyền thống.\n\n🔹 **20 năm Kết nối – Trưởng thành – Cống hiến – Lan tỏa.**\n📍 *Hẹn gặp nhau tại Hè Báo Lá Cải - Thuen 2026!*",
      imageUrl: "/gallery/20nam.jpg",
      category: "Sự kiện",
      createdAt: "2026-06-01"
    },
    {
      id: "n2",
      title: "ĐÃ 20 NĂM TRÔI QUA…",
      category: "Sự kiện",
      createdAt: "2026-06-05",
      imageUrl: "/gallery/20nam.png",
      videoUrl: "/gallery/20nam.mp4",
      content: "Và mùa hè vẫn luôn là khoảng thời gian đặc biệt nhất đối với các bạn trẻ của Palei cũng như các thế hệ anh chị đã đi trước.\n\nNgười ngoài thấy đây là recap.\n\nNhưng những người từng tham gia hết mình trong những mùa hè thì biết đây là lời “triệu tập”. Video này chỉ là vài mảnh ghép nhỏ của mùa hè 2025.\n\nVà những điều đáng nhớ nhất lại không nằm trong khung hình, bởi giá trị của chúng chỉ thật sự trọn vẹn khi được chính mình trải qua, và những khoảnh khắc “cháy” nhất của mùa hè chưa bao giờ được gói gọn trong vài phút video,…\n\nNăm nay sẽ có những câu chuyện mới. Những cuộc gặp gỡ mới. Những kỷ niệm mới đang chờ được viết tiếp.\n\n🔥 Phong trào hè 2026 có gì?\n\nChúng tôi biết. Nhưng, chỉ có thể bật mí rằng: tín hiệu đầu tiên đã xuất hiện, và đây mới chỉ là phần mở đầu.🤫"
    },
    {
      id: "n3",
      title: "Văn nghệ Hè 2013!\nMới đó đã 13 Năm.. Dàn Mỹ Nhân Khoá 9.",
      content: "...13 năm trước, những gương mặt trẻ trung, tài năng của Khóa 9 đã tỏa sáng rực rỡ trên sân khấu văn nghệ Hè Báo Lá Cải - Thuen 2013. Những tiết mục đặc sắc, những màn trình diễn đầy cảm xúc đã để lại dấu ấn khó phai trong lòng khán giả và trở thành một phần ký ức đẹp của mùa hè năm đó. Hôm nay, khi nhìn lại, chúng ta không chỉ nhớ về những khoảnh khắc ấy mà còn cảm nhận được sự gắn kết, tình bạn và niềm đam mê cháy bỏng đã tạo nên một mùa hè đáng nhớ cho tất cả mọi người.",
      imageUrl: "/gallery/vannghe2013.png",
      videoUrl: "/gallery/vannghe2013.mp4",
      category: "Sự kiện",
      createdAt: "2026-06-01"
    },
    {
      id: "n5",
      title: "Lễ khai mạc bùng nổ cùng 10 đội bóng",
      content: "BTC công bố lịch thi đấu chính thức và các hoạt động cổ vũ bên lề dành cho cổ động viên.",
      imageUrl: "/gallery/10doi.jpg",
      category: "Sự kiện",
      createdAt: "2026-06-01"
    }
  ],
  regulations: [
    {
      title: "Thể thức thi đấu",
      content: "Giải đấu chia làm 2 bảng A và B. Các đội thi đấu vòng tròn tính điểm chọn ra hai đội xuất sắc nhất mỗi bảng vào bán kết và chung kết."
    },
    {
      title: "Tính điểm",
      content: "Thắng 3 điểm, hòa 1 điểm, thua 0 điểm. Nếu bằng điểm sẽ xét hiệu số, bàn thắng, sau đó đối đầu."
    },
    {
      title: "Giải thưởng",
      content: "Cúp vô địch, huy chương, giải phong cách, vua phá lưới, và thủ môn xuất sắc."
    }
  ]
};
