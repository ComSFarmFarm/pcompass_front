import axios from 'axios';

const API_BASE_URL = '/auth';

const apiRequest = async (method, url, data, headers = {}) => {
    try {
        const response = await axios({
            method,
            url: `${API_BASE_URL}${url}`,
            data,
            headers
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('서버와의 연결에 실패했습니다.');
        }
    }
};

export const signup = async (user) => {
    return await apiRequest('POST', '/signup', user);
};

export const login = async (credentials) => {
    return await apiRequest('POST', '/login', credentials);
};

export const checkIdExists = async (user_id) => {
    return await apiRequest('POST', '/idExists', { user_id });
};

export const checkUsernameExists = async (username) => {
    return await apiRequest('POST', '/usernameExists', { username });
};

export const refreshAccessToken = async (refreshToken) => {
    return await apiRequest('POST', '/refreshToken', { refreshToken });
};

export const deleteUser = async (accessToken) => {
    return await apiRequest('DELETE', '/delete', null, {
        Authorization: accessToken
    });
};
