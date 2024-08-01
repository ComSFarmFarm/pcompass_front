const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

// CORS 설정
app.use(cors({
    origin: 'http://localhost:3000', // 클라이언트가 실행되는 도메인
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 로그인 엔드포인트 예시
app.post('auth/login', (req, res) => {
    const { user_id, password } = req.body;
    // 로그인 로직을 여기에 추가하세요
    res.json({ message: '로그인 성공!' });
});


// 회원가입 엔드포인트 예시
app.post('auth/signup', (req, res) => {
    const { username, email, password } = req.body;
    // 회원가입 처리 로직 추가
    res.send('회원가입 요청이 처리되었습니다.');
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
