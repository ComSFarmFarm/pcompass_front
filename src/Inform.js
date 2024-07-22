import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Styled components
const Page = styled.div`
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 0;
    background-color: #F7F7F7;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
`;

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
    text-align: left;
    margin-left: 720px;
    margin-right: auto;
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

const Select = styled.select`
    width: 100%;
    outline: none;
    border: none;
    height: 20px;
    font-size: 14px;
    font-weight: 400;
`;

const ErrorMessageWrap = styled.div`
    margin-top: 0px;
    margin-bottom: 10px;
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
    margin: 140px auto;
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

// React component
export default function Inform() {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');

    const [nameValid, setNameValid] = useState(false);
    const [dobValid, setDobValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);

    const navigate = useNavigate();

    const handleName = (e) => {
        const value = e.target.value;
        setName(value);
        setNameValid(value.trim() !== '');
    };

    const handleGender = (e) => {
        const value = e.target.value;
        setGender(value);
    };

    const handleDob = (e) => {
        const value = e.target.value;
        setDob(value);
        setDobValid(value.trim() !== '');
    };

    const onClickConfirmButton = () => {
        if (nameValid && dobValid && gender) {
            alert('정보 입력이 완료되었습니다.');
            navigate('/'); // Redirect to the sign-in page or next step
        } else {
            alert('입력된 정보를 확인해주세요.');
        }
    };

    useEffect(() => {
        if (nameValid && dobValid && gender) {
            setNotAllow(false);
        } else {
            setNotAllow(true);
        }
    }, [nameValid, dobValid, gender]);

    return (
        <Page>
            <TitleWrap>
                개인정보를
                <br />
                입력해주세요
            </TitleWrap>

            <ContentWrap>
                <InputTitle>이름</InputTitle>
                <InputWrap>
                    <Input 
                        type='text'
                        placeholder="홍길동"
                        value={name}
                        onChange={handleName}
                    />
                </InputWrap>
                <ErrorMessageWrap>
                    {
                        !nameValid && name.length > 0 && (
                            <div> 이름을 입력해주세요 </div>
                        )
                    }
                </ErrorMessageWrap>
                <InputTitle>성별</InputTitle>
                <InputWrap>
                    <Select value={gender} onChange={handleGender}>
                        <option value="">성별 선택</option>
                        <option value="male">남성</option>
                        <option value="female">여성</option>
                        <option value="other">기타</option>
                    </Select>
                </InputWrap>
                <InputTitle>생년월일</InputTitle>
                <InputWrap>
                    <Input 
                        type='date'
                        value={dob}
                        onChange={handleDob}
                    />
                </InputWrap>
                <ErrorMessageWrap>
                    {
                        !dobValid && dob.length > 0 && (
                            <div> 생년월일을 입력해주세요 </div>
                        )
                    }
                </ErrorMessageWrap>
            </ContentWrap>

            <BottomButton onClick={onClickConfirmButton} disabled={notAllow}>
                확인
            </BottomButton>
        </Page>
    );
}
