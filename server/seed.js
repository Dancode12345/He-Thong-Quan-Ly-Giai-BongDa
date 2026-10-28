const db = require('./database');

// Danh sách 10 đội bóng chuẩn cấp tỉnh (Hạng chuyên nghiệp / Phong trào cấp tỉnh)
const teamsData = [
    // Bảng A
    { name: 'FC Phố Biển Nha Trang', group_name: 'A', logo: 'pbnt.png' },
    { name: 'FC Công An Tỉnh', group_name: 'A', logo: 'cat.png' },
    { name: 'FC Cam Ranh United', group_name: 'A', logo: 'cru.png' },
    { name: 'FC Ninh Hòa FC', group_name: 'A', logo: 'nhf.png' },
    { name: 'FC Diên Khánh', group_name: 'A', logo: 'dk.png' },
    // Bảng B
    { name: 'FC Vạn Ninh', group_name: 'B', logo: 'vn.png' },
    { name: 'FC Trường Sa', group_name: 'B', logo: 'ts.png' },
    { name: 'FC Sinh Viên Khánh Hòa', group_name: 'B', logo: 'svkh.png' },
    { name: 'FC Khách sạn Yasaka', group_name: 'B', logo: 'ksy.png' },
    { name: 'FC Xây Dựng Số 1', group_name: 'B', logo: 'xds1.png' }
];

db.serialize(() => {
    db.run(`DELETE FROM teams`, (err) => {
        if (err) console.error(err);
    });

    // Cập nhật câu lệnh INSERT có thêm cột logo
    const stmt = db.prepare(`INSERT INTO teams (name, group_name, logo) VALUES (?, ?, ?)`);
    teamsData.forEach(team => {
        stmt.run(team.name, team.group_name, team.logo);
    });
    
    stmt.finalize(() => {
        console.log('🚀 Đã cập nhật database & nạp xong 10 đội kèm logo!');
        process.exit(0);
    });
});
