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
    position: relative; /* Added for positioning the indicator */
`;

const RequiredIndicator = styled.span`
    color: #ef0000;
    font-size: 20px;
    position: absolute;
    right: -20px;
    top: 0;
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

// 지역구 목록
const regions = ["서울", "경기도", "경상북도", "전라남도", "충청북도", "전라북도", "충청남도"];
// 서울시 구(군) 목록
const seoulDistricts = ["강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"];
// 경기도 시/군 목록
const gyeonggiCities = ["수원시", "성남시", "고양시", "용인시", "부천시", "안양시", "오산시", "평택시"];
// 경상북도 시/군 목록
const gyeongsangbukdoCities = ["경산시", "경주시", "구미시", "문경시", "상주", "안동시", "포항시"];
// 전라남도 시/군 목록
const jeollanamdoCities = ["광양시", "목포시", "여수시", "순천시", "해남군", "영암군"];
// 충청북도 시/군 목록
const chungcheongbukdoCities = ["청주시", "충주시", "제천시", "보은군", "옥천군"];
// 전라북도 시/군 목록
const jeollabukdoCities = ["전주시", "익산시", "군산시", "정읍시", "남원시", "김제시", "완주군"];
// 충청남도 시/군 목록
const chungcheongnamdoCities = ["천안시", "아산시", "공주시", "논산시", "보령시", "서산시", "계룡시"];

export default function Inform() {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [region, setRegion] = useState('');
    const [city, setCity] = useState('');

    const [nameValid, setNameValid] = useState(false);
    const [dobValid, setDobValid] = useState(false);
    const [genderValid, setGenderValid] = useState(false);
    const [regionValid, setRegionValid] = useState(false); // Optional, not used in validation
    const [cityValid, setCityValid] = useState(false); // Optional, not used in validation
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
        setGenderValid(value !== '');
    };

    const handleDob = (e) => {
        const value = e.target.value;
        setDob(value);
        setDobValid(value.trim() !== '');
    };

    const handleRegion = (e) => {
        const value = e.target.value;
        setRegion(value);
        setRegionValid(value !== '');
        setCity(''); // Reset city when region changes
    };

    const handleCity = (e) => {
        const value = e.target.value;
        setCity(value);
        setCityValid(value !== '');
    };

    const onClickConfirmButton = () => {
        if (nameValid && dobValid && genderValid) {
            alert('정보 입력이 완료되었습니다.');
            navigate('/'); // Redirect to the sign-in page or next step
        } else {
            alert('입력된 정보를 확인해주세요.');
        }
    };

    useEffect(() => {
        if (nameValid && dobValid && genderValid) {
            setNotAllow(false);
        } else {
            setNotAllow(true);
        }
    }, [nameValid, dobValid, genderValid]);

    return (
        <Page>
            <TitleWrap>
                개인정보를
                <br />
                입력해주세요
            </TitleWrap>

            <ContentWrap>
                <InputTitle>
                    이름
                    <RequiredIndicator>*</RequiredIndicator>
                </InputTitle>
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
                <InputTitle>
                    성별
                    <RequiredIndicator>*</RequiredIndicator>
                </InputTitle>
                <InputWrap>
                    <Select value={gender} onChange={handleGender}>
                        <option value="">성별 선택</option>
                        <option value="male">남성</option>
                        <option value="female">여성</option>
                        <option value="other">기타</option>
                    </Select>
                </InputWrap>
                <ErrorMessageWrap>
                    {
                        !genderValid && gender.length > 0 && (
                            <div> 성별을 선택해주세요 </div>
                        )
                    }
                </ErrorMessageWrap>
                <InputTitle>
                    생년월일
                    <RequiredIndicator>*</RequiredIndicator>
                </InputTitle>
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
                <InputTitle>지역구 (선택)</InputTitle>
                <InputWrap>
                    <Select value={region} onChange={handleRegion}>
                        <option value="">지역구 선택</option>
                        {regions.map((region) => (
                            <option key={region} value={region}>{region}</option>
                        ))}
                    </Select>
                </InputWrap>
                <ErrorMessageWrap>
                    {
                        !regionValid && region.length > 0 && (
                            <div> 지역구를 선택해주세요 </div>
                        )
                    }
                </ErrorMessageWrap>
                <InputTitle>시/군 (선택)</InputTitle>
                <InputWrap>
                    <Select value={city} onChange={handleCity} disabled={!region}>
                        <option value="">시/군 선택</option>
                        {
                            region === "서울" && seoulDistricts.map((district) => (
                                <option key={district} value={district}>{district}</option>
                            ))
                        }
                        {
                            region === "경기도" && gyeonggiCities.map((city) => (
                                <option key={city} value={city}>{city}</option>
                            ))
                        }
                        {
                            region === "경상북도" && gyeongsangbukdoCities.map((city) => (
                                <option key={city} value={city}>{city}</option>
                            ))
                        }
                        {
                            region === "전라남도" && jeollanamdoCities.map((city) => (
                                <option key={city} value={city}>{city}</option>
                            ))
                        }
                        {
                            region === "충청북도" && chungcheongbukdoCities.map((city) => (
                                <option key={city} value={city}>{city}</option>
                            ))
                        }
                        {
                            region === "전라북도" && jeollabukdoCities.map((city) => (
                                <option key={city} value={city}>{city}</option>
                            ))
                        }
                        {
                            region === "충청남도" && chungcheongnamdoCities.map((city) => (
                                <option key={city} value={city}>{city}</option>
                            ))
                        }
                    </Select>
                </InputWrap>
                <ErrorMessageWrap>
                    {
                        !cityValid && city.length > 0 && (
                            <div> 시/군을 선택해주세요 </div>
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