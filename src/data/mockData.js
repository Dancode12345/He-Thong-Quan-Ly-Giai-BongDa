export const initialTournamentData = {
  tournament: {
    name: "Hệ Thống Quản Lý Giải Bóng Đá Tỉnh Khánh Hoà",
    organizer: "Ban Tổ Chức Giải Bóng Đá Tỉnh Khánh Hoà",
    venue: "Sân vận động tỉnh Khánh Hoà",
    season: "Mùa giải 2026"
  },
  teams: [
    {
      id: "pbnt",
      name: "FC Phố Biển Nha Trang",
      shortName: "PBNT",
      logo: "/LOGO_NEW/pbnt.png",
      color: "#17A964",
      group: "A",
      players: []
    },
    {
      id: "cat",
      name: "FC Công An Tỉnh",
      shortName: "CAT",
      logo: "/LOGO_NEW/cat.png",
      color: "#22D3EE",
      group: "A",
      players: []
    },
    {
      id: "cru",
      name: "FC Cam Ranh United",
      shortName: "CRU",
      logo: "/LOGO_NEW/cru.png",
      color: "#C7F92F",
      group: "A",
      players: []
    },
    {
      id: "nhf",
      name: "FC Ninh Hòa FC",
      shortName: "NHF",
      logo: "/LOGO_NEW/nhf.png",
      color: "#A855F7",
      group: "A",
      players: []
    },
    {
      id: "dk",
      name: "FC Diên Khánh",
      shortName: "DK",
      logo: "/LOGO_NEW/dk.png",
      color: "#EC4899",
      group: "A",
      players: []
    },
    {
      id: "vn",
      name: "FC Vạn Ninh",
      shortName: "VN",
      logo: "/LOGO_NEW/vn.png",
      color: "#10B981",
      group: "B",
      players: []
    },
    {
      id: "ts",
      name: "FC Trường Sa",
      shortName: "TS",
      logo: "/LOGO_NEW/ts.png",
      color: "#F59E0B",
      group: "B",
      players: []
    },
    {
      id: "svkh",
      name: "FC Sinh Viên Khánh Hòa",
      shortName: "SVKH",
      logo: "/LOGO_NEW/svkh.png",
      color: "#2563EB",
      group: "B",
      players: []
    },
    {
      id: "ksy",
      name: "FC Khách sạn Yasaka",
      shortName: "KSY",
      logo: "/LOGO_NEW/ksy.png",
      color: "#DC2626",
      group: "B",
      players: []
    },
    {
      id: "xds1",
      name: "FC Xây Dựng Số 1",
      shortName: "XDS1",
      logo: "/LOGO_NEW/xds1.png",
      color: "#7C3AED",
      group: "B",
      players: []
    }
  ],
  matches: [
    {
      id: "m1",
      round: "Ngày 12 (Chủ Nhật) - Bảng A",
      homeTeamId: "pbnt",
      awayTeamId: "cat",
      kickoff: "2026-07-12T14:00:00+07:00",
      status: "finished",
      homeScore: 2,
      awayScore: 1,
      hot: true,
      scorers: [],
      cards: [],
      starPlayer: { name: "Chưa cập nhật", team: "Phố Biển Nha Trang", image: "/gallery/20nam.jpg" },
      highlightVideo: "",
      highlightPoster: "/gallery/20nam.jpg"
    }
  ],
  news: [
    {
      id: "n1",
      title: "Khai mạc Giải Bóng Đá Tỉnh Khánh Hoà 2026",
      content: "Giải đấu chính thức khởi tranh quy tụ 10 đội bóng mạnh nhất đại diện các khu vực trong toàn tỉnh.",
      imageUrl: "/gallery/20nam.jpg",
      category: "Sự kiện",
      createdAt: "2026-07-01"
    }
  ],
  regulations: [
    {
      title: "Thể thức thi đấu",
      content: "Giải đấu chia làm 2 bảng A và B. Các đội thi đấu vòng tròn tính điểm chọn ra hai đội xuất sắc nhất mỗi bảng vào bán kết và chung kết."
    }
  ]
};