const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// API kiểm tra server
app.get('/', (req, res) => {
    res.json({ message: 'API Server GOALAZO đang hoạt động bình thường!' });
});

// API trả về danh sách đội bóng đúng chuẩn format để Frontend (Teams.jsx) nhận diện
app.get('/api/teams', (req, res) => {
    db.all(`SELECT * FROM teams`, [], (err, rows) => {
        if (err) {
            console.error('Lỗi truy vấn database:', err.message);
            return res.status(500).json({ error: err.message });
        }
        // Trả về đúng định dạng object chứa mảng teams để Frontend .map() không bị lỗi
        res.json({ teams: rows });
    });
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server đang chạy tại: http://localhost:${PORT}`);
});