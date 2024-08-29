import axios from 'axios';

// 베이스 URL 설정 (환경 변수에서 가져오기)
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://13.124.10.62:8080';

// 인스턴스 생성
const apiInstance = axios.create({
    baseURL: API_BASE_URL,
});

// 뉴스 제목 가져오기 함수
export const fetchNewsTitles = async () => {
    try {
        const response = await apiInstance.get('/news/title');
        return response.data; // 서버에서 가져온 데이터
    } catch (error) {
        console.error("뉴스 제목을 가져오는 중 오류 발생:", error);
        throw error;
    }
};

// 로그인 함수
export const login = async (credentials) => {
    try {
        const response = await apiInstance.post('/auth/login', credentials);
        const { accessToken, userId } = response.data;
        localStorage.setItem('accessToken', accessToken); // 로그인 시 토큰 저장
        return { accessToken, userId };
    } catch (error) {
        const message = error.response?.data?.message || '로그인에 실패했습니다.';
        throw new Error(message);
    }
};

// 회원가입 함수
export const signup = async (userInfo) => {
    try {
        const response = await apiInstance.post('/auth/signup', userInfo, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || '회원가입에 실패했습니다.';
        throw new Error(message);
    }
};

// 퀴즈 질문 가져오기 함수
export const fetchQuizQuestion = async () => {
    try {
        const response = await apiInstance.get('/quiz/question');
        return response.data;
    } catch (error) {
        console.error("퀴즈 질문을 가져오는 중 오류 발생:", error);
        throw error;
    }
};

// 퀴즈 정답 제출 함수
export const submitQuizAnswer = async (questionId, answer, userId) => {
    try {
        const response = await apiInstance.post('/quiz/answer', {
            questionId,
            answer,
            userId: userId // userId는 매개변수로 받기
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            const status = error.response.status;
            const message = error.response.data?.message || '서버 에러';
            
            if (status === 400) {
                throw new Error('퀴즈를 찾을 수 없습니다.');
            } else {
                throw new Error(message);
            }
        } else {
            throw new Error('서버 에러');
        }
    }
};

// 후보자 목록 가져오기 함수
export const fetchCandidates = async () => {
    try {
        const response = await apiInstance.get('/promise/candidates');
        return response.data.candidates; // 서버에서 가져온 데이터
    } catch (error) {
        console.error("후보자 목록을 가져오는 중 오류 발생:", error);
        throw error;
    }
};

// 공약 요약 가져오기 함수
export const fetchPromiseSummary = async (name, region) => {
    try {
        const response = await apiInstance.post('/promise/summary', {
            name,
            region
        });
        return response.data.summary;
    } catch (error) {
        console.error("공약 요약을 가져오는 중 오류 발생:", error);
        throw error;
    }
};

// 키워드 분석 결과 가져오기 함수
export const fetchKeywords = async (name, region) => {
    try {
        const response = await apiInstance.post('/promise/keywords', {
            name,
            region
        });
        return response.data.words;
    } catch (error) {
        console.error("키워드 분석 결과를 가져오는 중 오류 발생:", error);
        throw error;
    }
};


// 퀴즈 결과 가져오기 함수
export const fetchQuizResult = async () => {
    try {
        const response = await apiInstance.get('/quiz/result');
        return response.data; // 서버에서 가져온 데이터 반환
    } catch (error) {
        console.error("퀴즈 결과를 가져오는 중 오류 발생:", error);
        throw error;
    }
};
