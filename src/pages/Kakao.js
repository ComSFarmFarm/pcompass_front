import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Styled components
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh; /* 전체 화면 높이 */
    background-color: #f5f5f5; /* 배경색 */
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
    color: #000000;
    text-align: center;
    margin-bottom: 20px;
`;

const Subtitle = styled.p`
    font-size: 14px;
    color: #7b7b7b;
    text-align: center;
    margin-bottom: 40px;
`;

const Input = styled.input`
    width: 300px;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 5px;
    border: 1px solid #e2e2e0;
    font-size: 16px;
    &:focus {
        border-color: #9e30f4;
        outline: none;
    }
`;

const Button = styled.button`
    width: 320px;
    padding: 15px;
    background-color: #f2f2f2;
    color: #000000;
    font-size: 16px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    margin-bottom: 15px;
    &:hover {
        background-color: #dedede;
    }
`;

const FindAccount = styled.p`
    font-size: 14px;
    color: #7b7b7b;
    text-align: center;
    margin-top: 20px;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

// React component
export default function KakaoLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        console.log("Login with:", email, password);
        
        // 로그인 성공 시 kakaochat으로 라우팅
        const isSuccess = true; // 실제 로그인 성공 여부 확인 로직으로 대체
        if (isSuccess) {
            navigate('/kakaochat');
        }
    };

    return (
        <Wrapper>
            <Title>Welcome to KakaoTalk</Title>
            <Subtitle>If you have a Kakao Account, log in with your email or phone number.</Subtitle>

            <Input 
                type="text" 
                placeholder="Email or phone number" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <Button onClick={handleLogin}>Log In</Button>
            <Button onClick={() => navigate('/signup')}>Sign Up</Button>

            <FindAccount onClick={() => navigate('/find-account')}>Find Kakao Account or Password</FindAccount>
        </Wrapper>
    );
}
