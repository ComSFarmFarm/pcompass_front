import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PageWrapper from '../components/PageWrapper';
import { fetchQuizQuestion, submitQuizAnswer } from '../api';


// 스타일 컴포넌트
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 100px auto;
    position: relative;
`;

const Header = styled.div`
    font-size: 44px;
    font-weight: bold;
    color: white;
    margin-bottom: 0px;
    margin-top: 100px;
`;

const OuterFrame = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(30, 30, 30, 0.8);
    padding: 40px;
    border-radius: 17px;
    max-width: 800px;
    border: 5px solid #6a0dad;
    position: relative;
    filter: ${({ blur }) => (blur ? 'blur(4px)' : 'none')};
    transition: filter 0.3s ease;
`;

const Title = styled.div`
    position: absolute;
    top: -30px;
    left: 20px;
    background-color: rgba(30, 30, 30, 0.8);
    color: #6a0dad;
    font-size: 32px;
    font-weight: bold;
    padding: 10px 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const InfoText = styled.div`
    color: white;
    font-size: 25px;
    font-weight: bold;
    text-align: center;
    margin-top: 50px;
    margin-bottom: 40px;
`;

const ButtonContainer = styled.div`
    display: flex;
    margin-top: 50px;
    justify-content: space-between;
    width: 100%;
    max-width: 700px;
    gap: 20px;
`;

const Button = styled.button`
    padding: 20px 40px;
    font-size: 25px;
    font-weight: bold;
    cursor: pointer;
    border: none;
    border-radius: 12px;
    background-color: #6a0dad;
    color: white;
    transition: background-color 0.3s, transform 0.3s;
    width: 100%;
    max-width: 320px;
    height: 120px;
    
    &:hover {
        background-color: #5c00b4;
        transform: scale(1.05);
    }
`;

const StarContainer = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    gap: 10px;
`;

const Star = styled.div`
    font-size: 30px;
    color: ${({ filled }) => (filled ? 'yellow' : 'gray')};
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 10;
`;

const OverlayText = styled.div`
    color: white;
    font-size: 30px;
    font-weight: bold;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    white-space: pre-line; /* 줄바꿈을 지원 */
`;


const Polquiz = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState({});
    const [message, setMessage] = useState('');
    const [questionId, setQuestionId] = useState(null);
    const [level, setLevel] = useState(0);
    const [userId] = useState('yjin@goatfarm.ai'); // 정적으로 설정된 userId
    const [blur, setBlur] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchQuizQuestion();
                setQuestion(data.question);
                setOptions(data.options);
                setQuestionId(data.questionId);
                setLevel(data.level);
            } catch (error) {
                console.error('Failed to fetch data', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (message) {
            setBlur(true);
            const timer = setTimeout(() => {
                setBlur(false);
                setMessage(''); // message와 blur를 동시에 제거
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleOptionClick = async (answer) => {
        if (questionId === null) {
            setMessage('질문 ID를 찾을 수 없습니다.');
            return;
        }
        try {
            const response = await submitQuizAnswer(questionId, answer, userId);
            const newMessage = response.newScore !== null 
                ? `${response.message}\n현재 점수: ${response.newScore}`
                : response.message;
            setMessage(newMessage);
        } catch (error) {
            setMessage(error.message);
        }
    };
    

    return (
        <PageWrapper>
            <Header>오늘의 정치 퀴즈</Header>
            <Wrapper>
                {message && (
                    <Overlay>
                        <OverlayText>{message}</OverlayText>
                    </Overlay>
                )}
                <OuterFrame blur={blur}>
                    <Title>QUIZ</Title>
                    <InfoText>
                        {question || '질문을 불러오는 중입니다...'}
                    </InfoText>
                    <ButtonContainer>
                        {options.a && (
                            <Button onClick={() => handleOptionClick('a')}>{options.a}</Button>
                        )}
                        {options.b && (
                            <Button onClick={() => handleOptionClick('b')}>{options.b}</Button>
                        )}
                    </ButtonContainer>
                    <StarContainer>
                        {[...Array(5)].map((_, index) => (
                            <Star key={index} filled={index < level}>★</Star>
                        ))}
                    </StarContainer>
                </OuterFrame>
            </Wrapper>
        </PageWrapper>
    );
};

export default Polquiz;
