// src/api.js
import axios from 'axios';

const API_BASE_URL = 'http://13.124.10.62:8080/auth'; // 수정된 베이스 URL

// 로그인 함수
export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || '로그인에 실패했습니다.';
        throw new Error(message);
    }
};

// 회원가입 함수
export const signup = async (userInfo) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/signup`, userInfo);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || '회원가입에 실패했습니다.';
        throw new Error(message);
    }
};
