import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api'; // api.js에서 signup 함수를 가져옵니다.
import FirstWrapper from '../components/FirstWrapper'


// Styled components
const TitleWrap = styled.div`
    margin-top: 130px;
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
    text-align: center;  // 중앙 정렬
    width: 100%;
`;


const InputWrap = styled.div`
    display: flex;
    border-radius: 8px;
    padding: 16px;
    background-color: white;
    border: 1px solid #e2e2e0;
    margin-bottom: 10px;
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
    height: 40px;
    font-size: 14px;
    font-weight: 400;
    padding: 8px;
    background-color: white;
    border-radius: 8px;
    border: 1px solid #e2e2e0;
    margin-bottom: 5px;

    &:focus {
        border: 1px solid #9e30f4;
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
    margin: 50px auto 20px auto;
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

const SigninText = styled.div`
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

const AdditionalInputTitle = styled.div`
    font-size: 19px;
    font-weight: 600;
    color: #000000;
    margin-bottom: 10px;
    text-align: center;
    width: 100%;
`;

const AdditionalInputWrap = styled.div`
    display: flex;
    border-radius: 8px;
    padding: 16px;
    background-color: white;
    border: 1px solid #e2e2e0;
    margin-bottom: 50px;
    max-width: 100%;
    width: 350px;
    margin-left: auto;
    margin-right: auto;

    &:focus-within {
        border: 1px solid #9e30f4;
    }
`;

const SelectWrap = styled.div`
    display: flex;
    border-radius: 8px;
    padding: 16px;
    background-color: white;
    border: 1px solid #e2e2e0;
    margin-bottom: 50px;
    max-width: 100%;
    width: 350px;
    margin-left: auto;
    margin-right: auto;

    &:focus-within {
        border: 1px solid #9e30f4;
    }
`;

const regions = ["서울", "경기도", "경상북도", "전라남도", "충청북도", "전라북도", "충청남도", "강원도", "인천", "세종", "대전", "광주", "대구", "울산", "부산"];

const cities = {
    서울: ["강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"],
    경기도: ["수원시", "성남시", "고양시", "용인시", "부천시", "안양시", "오산시", "평택시"],
    경상북도: ["경산시", "경주시", "구미시", "문경시", "상주", "안동시", "포항시"],
    전라남도: ["광양시", "목포시", "여수시", "순천시", "해남군", "영암군"],
    충청북도: ["청주시", "충주시", "제천시", "보은군", "옥천군"],
    전라북도: ["전주시", "익산시", "군산시", "정읍시", "남원시", "김제시", "완주군"],
    충청남도: ["천안시", "아산시", "공주시", "논산시", "보령시", "서산시", "계룡시"],
    강원도: ["강릉시", "동해시", "삼척시", "속초시", "원주시", "춘천시", "태백시", "홍천군", "횡성군"],
    인천: ["중구", "동구", "미추홀구", "연수구", "남동구", "부평구", "계양구", "서구"],
    세종: ["세종시"],
    대전: ["대덕구", "동구", "서구", "유성구", "중구"],
    광주: ["광산구", "남구", "동구", "북구", "서구"],
    대구: ["남구", "동구", "북구", "서구", "중구"],
    울산: ["남구", "동구", "북구", "중구", "울주군"],
    부산: ["강서구", "금정구", "기장군", "남구", "동구", "동래구", "부산진구", "북구", "사상구", "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구"]
};

const parties = ["더불어민주당", "국민의힘", "개혁 신당", "진보당", "새로운 미래", "사회 민주당","기본 소득당", "기타"];

const convertGender = (gender) => {
    if (gender === "male") return "M";
    if (gender === "female") return "F";
    return "";
};

export default function Signup() {
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [pwConfirm, setPwConfirm] = useState('');
    const [username, setUsername] = useState('');
    const [gender, setGender] = useState('');
    const [birth_date, setBirthDate] = useState('');
    const [region, setRegion] = useState('');
    const [city, setCity] = useState('');
    const [preferred_party, setPreferredParty] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const [emailValid, setEmailValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [pwMatch, setPwMatch] = useState(false);
    const [notAllow, setNotAllow] = useState(true);

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPw(e.target.value);
    };

    const handlePwConfirm = (e) => {
        setPwConfirm(e.target.value);
    };

    const handleUsername = (e) => {
        setUsername(e.target.value);
    };

    const handleGender = (e) => {
        setGender(e.target.value);
    };

    const handleBirthDate = (e) => {
        setBirthDate(e.target.value);
    };

    const handleRegion = (e) => {
        setRegion(e.target.value);
        setCity(''); // Reset city when region changes
    };

    const handleCity = (e) => {
        setCity(e.target.value);
    };

    const handlePreferredParty = (e) => {
        setPreferredParty(e.target.value);
    };

    useEffect(() => {
        setEmailValid(email.includes('@') && email.includes('.'));
        setPwValid(pw.length >= 8 && /[a-zA-Z]/.test(pw) && /[0-9]/.test(pw) && /[^a-zA-Z0-9]/.test(pw));
        setPwMatch(pw === pwConfirm);
        setNotAllow(!(emailValid && pwValid && pwMatch && username && gender && birth_date && region && city));
    }, [email, pw, pwConfirm, username, gender, birth_date, region, city, emailValid, pwValid, pwMatch]);

    const formatDate = (date) => {
        const d = new Date(date);
        console.log(d);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('');
        
     };

    const onClickConfirmButton = async () => {
        if (emailValid && pwValid && pwMatch && username && gender && birth_date && region && city) {
            try {
                const userInfo = {
                    user_id: email, 
                    password: pw, 
                    username, // Changed from name to username
                    gender: convertGender(gender), // Convert gender to 'M' or 'F'
                    birth_date: formatDate(birth_date), // Convert date to YYYYMMDD format
                    region, 
                    city,
                    preferred_party // Add preferred_party preference
                };
                console.log("userInfo : ["+JSON.stringify(userInfo)+"]");
                const response = await signup(userInfo); // api.js의 signup 함수 호출
                console.log(response);
                navigate('/login');
            } catch (error) {
                setErrorMessage(error.message);
            }
        } else {
            setErrorMessage('입력된 정보를 확인해주세요.');
        }
    };

    return (
        <FirstWrapper>
            <TitleWrap>
                회원가입
            </TitleWrap>

            <ContentWrap>
                <InputTitle>이메일</InputTitle>
                <InputWrap>
                    <Input 
                        type='text'
                        placeholder="이메일을 입력하세요"
                        value={email} 
                        onChange={handleEmail}
                    />
                </InputWrap>
                <ErrorMessageWrap>
                    {
                        !emailValid && email.length > 0 && (
                            <div>올바른 이메일을 입력해주세요</div>
                        )
                    }
                </ErrorMessageWrap>
                <InputTitle>비밀번호</InputTitle>
                <InputWrap>
                    <Input 
                        type='password'
                        placeholder="비밀번호를 입력하세요"
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
                <InputTitle>비밀번호 확인</InputTitle>
                <InputWrap>
                    <Input 
                        type='password'
                        placeholder="비밀번호를 다시 입력하세요"
                        value={pwConfirm}
                        onChange={handlePwConfirm}
                    />
                </InputWrap>
                <ErrorMessageWrap>
                    {
                        !pwMatch && pwConfirm.length > 0 && (
                            <div>비밀번호가 일치하지 않습니다.</div>
                        )
                    }
                </ErrorMessageWrap>
                <AdditionalInputTitle>이름</AdditionalInputTitle>
                <AdditionalInputWrap>
                    <Input 
                        type='text'
                        placeholder="이름을 입력하세요"
                        value={username} // Changed from name to username
                        onChange={handleUsername} // Changed from handleName to handleUsername
                    />
                </AdditionalInputWrap>
                <AdditionalInputTitle>성별</AdditionalInputTitle>
                <SelectWrap>
                    <Select value={gender} onChange={handleGender}>
                        <option value="">성별을 선택하세요</option>
                        <option value="male">남성</option>
                        <option value="female">여성</option>
                    </Select>
                </SelectWrap>
                <AdditionalInputTitle>생년월일</AdditionalInputTitle>
                <AdditionalInputWrap>
                    <Input 
                        type='date'
                        placeholder="생년월일을 입력하세요"
                        value={birth_date} // Changed from birthDate to birth_date
                        onChange={handleBirthDate}
                    />
                </AdditionalInputWrap>
                <AdditionalInputTitle>지역구</AdditionalInputTitle>
                <SelectWrap>
                    <Select value={region} onChange={handleRegion}>
                        <option value="">지역구를 선택하세요</option>
                        {regions.map((region) => (
                            <option key={region} value={region}>{region}</option>
                        ))}
                    </Select>
                </SelectWrap>
                <AdditionalInputTitle>시/군</AdditionalInputTitle>
                <SelectWrap>
                    <Select value={city} onChange={handleCity} disabled={!region}>
                        <option value="">시/군을 선택하세요</option>
                        {region && cities[region]?.map((city) => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </Select>
                </SelectWrap>
                <AdditionalInputTitle>선호하는 정당</AdditionalInputTitle>
                <SelectWrap>
                    <Select value={preferred_party} onChange={handlePreferredParty}>
                        <option value="">정당을 선택하세요</option>
                        {parties.map((party) => (
                            <option key={party} value={party}>{party}</option>
                        ))}
                    </Select>
                </SelectWrap>
                {errorMessage && (
                    <ErrorMessageWrap>
                        {errorMessage}
                    </ErrorMessageWrap>
                )}
            </ContentWrap>

            <BottomButton onClick={onClickConfirmButton} disabled={notAllow}>
                회원가입
            </BottomButton>

            <SigninText onClick={() => navigate('/login')}>
                로그인
            </SigninText>
        </FirstWrapper>
    );
}
