import axios from 'axios';

// 베이스 URL 설정
const API_BASE_URL = 'http://13.124.10.62:8080';

// 뉴스 제목 가져오기 함수
export const fetchNewsTitles = async () => {
    try {
        const response = await axios.get(API_BASE_URL + '/news/title');
        return response.data; // 서버에서 가져온 데이터
    } catch (error) {
        console.error("Error fetching news titles:", error);
        throw error;
    }
};

// 로그인 함수
export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
        return response.data;
    } catch (error) {
        // axios는 에러 응답이 있을 때 response 객체를 제공합니다
        const message = error.response?.data?.message || '로그인에 실패했습니다.';
        throw new Error(message);
    }
};

// 회원가입 함수
export const signup = async (userInfo) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signup`, userInfo, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        // axios는 에러 응답이 있을 때 response 객체를 제공합니다
        const message = error.response?.data?.message || '회원가입에 실패했습니다.';
        throw new Error(message);
    }
};
