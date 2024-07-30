// src/api/auth.js

const API_URL = 'http://your-api-url.com'; // API URL을 여기에 입력하세요

export async function login(userId, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId, password }),
    });
    return response.json();
}

export async function signup(userId, password, username, gender, birthDate, preferredParty) {
    const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: userId,
            password,
            username,
            gender,
            birth_date: birthDate,
            preferred_party: preferredParty,
        }),
    });
    return response.json();
}
