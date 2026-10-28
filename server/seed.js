const db = require('./database');

// Danh sách 10 đội bóng chuẩn cấp tỉnh (Hạng chuyên nghiệp / Phong trào cấp tỉnh)
const teamsData = [
    // Bảng A
    { name: 'FC Phố Biển Nha Trang', group_name: 'A' },
    { name: 'FC Công An Tỉnh', group_name: 'A' },
    { name: 'FC Cam Ranh United', group_name: 'A' },
    { name: 'FC Ninh Hòa FC', group_name: 'A' },
    { name: 'FC Diên Khánh', group_name: 'A' },
    // Bảng B
    { name: 'FC Vạn Ninh', group_name: 'B' },
    { name: 'FC Trường Sa', group_name: 'B' },
    { name: 'FC Sinh Viên Khánh Hòa', group_name: 'B' },
    { name: 'FC Khách sạn Yasaka', group_name: 'B' },
    { name: 'FC Xây Dựng Số 1', group_name: 'B' }
];

db.serialize(() => {
    // Xóa dữ liệu cũ để cập nhật tên mới
    db.run(`DELETE FROM teams`, (err) => {
        if (err) console.error(err);
    });

    // Nạp lại danh sách đội cấp tỉnh
    const stmt = db.prepare(`INSERT INTO teams (name, group_name) VALUES (?, ?)`);
    teamsData.forEach(team => {
        stmt.run(team.name, team.group_name);
    });
    
    stmt.finalize(() => {
        console.log('🚀 Đã cập nhật thành công danh sách 10 Câu Lạc Bộ Cấp Tỉnh vào CSDL!');
        process.exit(0);
    });
});