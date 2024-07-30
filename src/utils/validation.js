// src/utils/validation.js

export const validateSignUp = (formData) => {
    const { user_id, password, username, gender, birth_date, preferred_party } = formData;
    if (!user_id || !password || !username || !gender || !birth_date || !preferred_party) {
        return '필수적인 파라미터가 전달되지 않았습니다.';
    }
    // 추가 유효성 검사
    return null;
};
