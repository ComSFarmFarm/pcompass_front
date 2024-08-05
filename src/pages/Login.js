import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import FirstWrapper from '../components/FirstWrapper';

// Styled components

const TitleWrap = styled.div`
    margin-top: 150px;
    font-size: 35px;
    font-weight: 700;
    color: #262626;
    text-align: center;
`;

const ContentWrap = styled.div`
    margin-top: 120px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    padding-bottom: 0;
    padding-left: 0;
`;

const InputTitle = styled.div`
    font-size: 19px;
    font-weight: 600;
    color: #000000;
    margin-bottom: 10px;
    text-align: center;
    width: 100%;
`;

const InputWrap = styled.div`
    display: flex;
    border-radius: 8px;
    padding: 16px;
    background-color: white;
    border: 1px solid #e2e2e0;
    margin-bottom: 16px;
    max-width: 100%;
    width: 350px;
    margin-left: auto;
    margin-right: auto;

    &:focus-within {
        border: 1px solid #9e30f4;
    }
`;

const Input = styled.input`
    width: 100%;
    outline: none;
    border: none;
    height: 20px;
    font-size: 14px;
    font-weight: 400;

    &::placeholder {
        color: #dadada;
    }
`;

const ErrorMessageWrap = styled.div`
    margin-top: 0px;
    margin-bottom: 50px;
    color: #ef0000;
    font-size: 15px;
    text-align: center;
`;

const BottomButton = styled.button`
    width: 400px;
    height: 60px;
    border: none;
    font-weight: 700;
    font-size: 15px;
    background-color: #8528d4;
    border-radius: 24px;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
    margin: 0px auto 20px auto;
    display: block;

    &:disabled {
        background-color: #8528d4;
        color: white;
        cursor: not-allowed;
    }

    &:not(:disabled):hover {
        background-color: #5d1a90;
    }
`;

const SignupText = styled.div`
    text-align: center;
    font-size: 16px;
    color: #000000;
    cursor: pointer;
    margin-top: 10px;
    margin-bottom: 300px;

    &:hover {
        text-decoration: underline;
    }
`;

// React component
export default function Login() {
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');

    const [emailValid, setEmailValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true); // 초기 상태를 true로 설정

    const navigate = useNavigate();

    const handleEmail = (e) => {
        const value = e.target.value;
        setEmail(value);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 형식 정규 표현식
        setEmailValid(emailRegex.test(value));
    };

    const handlePassword = (e) => {
        const value = e.target.value;
        setPw(value);
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&()\-_=+])(?!.*[^a-zA-Z0-9$`~!@$!%*#^?&()\-_=+]).{8,20}$/;
        setPwValid(passwordRegex.test(value));
    };

    const onClickConfirmButton = async () => {
        if (emailValid && pwValid) {
            try {
                await login({ id: email, password: pw }); // 필드 이름을 백엔드 요구사항에 맞게 조정
                navigate('/main'); // 로그인 성공 시 메인 페이지로 이동
            } catch (error) {
                alert(error.message); // 에러 메시지 표시
            }
        } else {
            alert('입력된 정보를 확인해주세요.');
        }
    };

    useEffect(() => {
        setNotAllow(!(emailValid && pwValid)); // 유효성 검사 결과에 따라 버튼 비활성화
    }, [emailValid, pwValid]);

    return (
        <FirstWrapper>
            <TitleWrap>
                아이디와 비밀번호를
                <br />
                입력해주세요
            </TitleWrap>

            <ContentWrap>
                <InputTitle>이메일</InputTitle>
                <InputWrap>
                    <Input 
                        type='text'
                        placeholder="comsfarmfarm@gmail.com"
                        value={email} 
                        onChange={handleEmail}
                    />
                </InputWrap>
                <ErrorMessageWrap>
                    {
                        !emailValid && email.length > 0 && (
                            <div> 올바른 이메일을 입력해주세요 </div>
                        )
                    }
                </ErrorMessageWrap>
                <InputTitle>비밀번호</InputTitle>
                <InputWrap>
                    <Input 
                        type='password'
                        placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                        value={pw}
                        onChange={handlePassword}
                    />
                </InputWrap>
                <ErrorMessageWrap>
                    {
                        !pwValid && pw.length > 0 && (
                            <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
                        )
                    }
                </ErrorMessageWrap>
            </ContentWrap>

            <BottomButton onClick={onClickConfirmButton} disabled={notAllow}>
                확인
            </BottomButton>

            <SignupText onClick={() => navigate('/signup')}>
                회원가입
            </SignupText>

        </FirstWrapper>
    );
}
