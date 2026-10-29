const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'goalazo.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Lỗi kết nối SQLite:', err.message);
    } else {
        console.log('Đã kết nối thành công tới cơ sở dữ liệu SQLite (goalazo.db).');
    }
});

const teamsData = [
    { name: 'FC Phố Biển Nha Trang', group_name: 'A', logo: 'pbnt.png' },
    { name: 'FC Công An Tỉnh', group_name: 'A', logo: 'cat.png' },
    { name: 'FC Cam Ranh United', group_name: 'A', logo: 'cru.png' },
    { name: 'FC Ninh Hòa FC', group_name: 'A', logo: 'nhf.png' },
    { name: 'FC Diên Khánh', group_name: 'A', logo: 'dk.png' },
    { name: 'FC Vạn Ninh', group_name: 'B', logo: 'vn.png' },
    { name: 'FC Trường Sa', group_name: 'B', logo: 'ts.png' },
    { name: 'FC Sinh Viên Khánh Hòa', group_name: 'B', logo: 'svkh.png' },
    { name: 'FC Khách sạn Yasaka', group_name: 'B', logo: 'ksy.png' },
    { name: 'FC Xây Dựng Số 1', group_name: 'B', logo: 'xds1.png' }
];

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        name TEXT NOT NULL,
        email TEXT
    )`);

    // Xóa và tạo lại bảng teams để chắc chắn cập nhật cột logo
    db.run(`DROP TABLE IF EXISTS teams`);

    db.run(`CREATE TABLE teams (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        group_name TEXT,
        logo TEXT,
        color TEXT
    )`, () => {
        // Tự động insert luôn 10 đội bóng vào sau khi tạo bảng xong
        const stmt = db.prepare(`INSERT INTO teams (name, group_name, logo) VALUES (?, ?, ?)`);
        teamsData.forEach(team => {
            stmt.run(team.name, team.group_name, team.logo);
        });
        stmt.finalize(() => {
            console.log('🚀 Đã tự động nạp thành công 10 đội bóng kèm Logo vào CSDL!');
        });
    });

    db.run(`CREATE TABLE IF NOT EXISTS players (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        team_id INTEGER,
        name TEXT NOT NULL,
        position TEXT,
        number INTEGER,
        FOREIGN KEY(team_id) REFERENCES teams(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS matches (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        group_name TEXT,
        team1_id INTEGER,
        team2_id INTEGER,
        score1 INTEGER DEFAULT 0,
        score2 INTEGER DEFAULT 0,
        status TEXT DEFAULT 'CHUA_DA',
        match_date TEXT,
        venue TEXT,
        FOREIGN KEY(team1_id) REFERENCES teams(id),
        FOREIGN KEY(team2_id) REFERENCES teams(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS match_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        match_id INTEGER,
        player_id INTEGER,
        minute INTEGER,
        event_type TEXT,
        FOREIGN KEY(match_id) REFERENCES matches(id),
        FOREIGN KEY(player_id) REFERENCES players(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS articles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        type TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )`);

    console.log('Đã khởi tạo cấu trúc toàn bộ bảng CSDL thành công!');
});

module.exports = db;