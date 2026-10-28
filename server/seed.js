const db = require('./database');

// Danh sách 10 đội bóng chuẩn theo bảng đấu của giải tỉnh
const teamsData = [
    // Bảng A
    { name: 'FC Thanh Niên', group_name: 'A' },
    { name: 'Khóa 24', group_name: 'A' },
    { name: 'Khóa 23', group_name: 'A' },
    { name: 'Khóa 8', group_name: 'A' },
    { name: 'Khóa 15', group_name: 'A' },
    // Bảng B
    { name: 'FC K10-11', group_name: 'B' },
    { name: 'Khóa 22', group_name: 'B' },
    { name: 'Khóa 21', group_name: 'B' },
    { name: 'Khóa 19', group_name: 'B' },
    { name: 'Khóa 20', group_name: 'B' }
];

db.serialize(() => {
    // Xóa dữ liệu cũ để tránh trùng lặp
    db.run(`DELETE FROM teams`, (err) => {
        if (err) console.error(err);
    });

    // Nạp lại danh sách đội chuẩn
    const stmt = db.prepare(`INSERT INTO teams (name, group_name) VALUES (?, ?)`);
    teamsData.forEach(team => {
        stmt.run(team.name, team.group_name);
    });
    
    stmt.finalize(() => {
        console.log('🚀 Đã cập nhật thành công danh sách đội bóng chuẩn giải tỉnh vào CSDL!');
        process.exit(0);
    });
});