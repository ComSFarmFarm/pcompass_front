import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa'; // 체크 아이콘 추가
import PageWrapper from '../components/PageWrapper';

// 스타일 컴포넌트
const Container = styled.div`
  width: 100%;
`;

const Title = styled.h1`
  text-align: center;
  margin-top: 160px;
  font-size: 40px;
`;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuestionBlock = styled.div`
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
  max-width: 80%;
`;

const QuestionTitle = styled.h2`
  font-size: 22px;
  margin-bottom: 20px;
`;

const OptionContainer = styled.div`
  display: flex;
  justify-content: center; /* 컨테이너를 중앙에 배치 */
  align-items: center;
  gap: 43px; /* 동그라미들 사이의 간격을 20px로 설정 */
  margin-top: 50px;
  margin-bottom: 20px;
`;

const Option = styled.div`
  display: inline-block;
  position: relative;
`;

const OptionLabel = styled.label`
  display: inline-block;
  border-radius: 50%;
  background-color: ${props => {
    if (props.isSelected && props.isGray) return 'gray'; // 선택되었고 세 번째 동그라미는 회색
    if (props.isSelected) return 'purple'; // 선택된 동그라미는 보라색
    return 'white'; // 선택되지 않은 동그라미는 흰색
  }};
  color: transparent;
  text-align: center;
  line-height: ${props => props.size || '50px'};
  border: 2px solid ${props => {
    if (props.isSelected && props.isGray) return 'gray'; // 선택되었고 세 번째 동그라미는 회색
    if (props.isSelected) return 'purple'; // 선택된 동그라미는 보라색
    return '#ddd'; // 선택되지 않은 동그라미는 회색
  }};
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s, border-color 0.3s;
  width: ${props => props.size || '50px'};
  height: ${props => props.size || '50px'};
  position: relative;
  overflow: hidden; /* 체크 표시가 동그라미 안에 들어가도록 설정 */
`;

const HiddenRadio = styled.input.attrs({ type: 'radio' })`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const CheckMark = styled(FaCheck)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 24px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center; /* 버튼들을 오른쪽으로 정렬합니다 */
  margin-top: 200px;
  margin-bottom: 180px;
  width: 100%;
  max-width: 1000px;
  gap: 700px; /* 버튼들 사이의 간격을 조절합니다 */
  margin-left: 380px;
 
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 560;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #ffffff;
  color: rgb(0, 0, 0);
  transition: background-color 0.3s;
`;

const BackButton = styled(Button)`
  /* 필요에 따라 추가적인 스타일 조정 가능 */
`;

const NextButton = styled(Button)`
  /* 필요에 따라 추가적인 스타일 조정 가능 */
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 20px;
  text-align: center;
  margin-top: 60px;
`;

const Text = styled.span`
  font-size: 16px;
  color: #555;
  font-weight: 600;
`;

const ColorTest = () => {
  const questions = [
    { question: '1. 정부는 경제 활동에 적극 개입하여 불평등을 줄여야 한다고 생각하십니까?', options: ['1', '2', '3', '4', '5'] },
    { question: '2. 재벌의 경제적 지배력을 줄이기 위한 강력한 규제가 필요하다고 생각하십니까?', options: ['1', '2', '3', '4', '5'] },
    { question: '3. 젠더 평등을 위해 더 많은 법적 보호와 정책이 필요하다고 생각하십니까?', options: ['1', '2', '3', '4', '5'] },
    { question: '4. 이민자 수용과 그들의 권리 보호가 불필요하다고 생각하십니까?', options: ['5', '4', '3', '2', '1'] },
    { question: '5. 원자력 발전을 줄이고 재생 에너지를 확대해야 한다고 생각하십니까?', options: ['1', '2', '3', '4', '5'] },
    { question: '6. 공교육에 더 많은 예산을 투입할 시에도 교육 격차가 좁혀지지 않을 것이라 생각하십니까?', options: ['5', '4', '3', '2', '1'] },
    { question: '7. 대입 제도의 공정성을 높이기 위해 강력한 개혁이 필요하다고 생각하십니까?', options: ['1', '2', '3', '4', '5'] },
    { question: '8. 모든 국민이 국가에서 제공하는 건강 보험에 가입해야 한다고 생각하십니까?', options: ['1', '2', '3', '4', '5'] },
    { question: '9. 모든 국민에게 기본소득을 제공하는 정책이 필요하다고 생각하십니까?', options: ['1', '2', '3', '4', '5'] },
    { question: '10. 중국과의 경제적, 외교적 관계를 강화가 불필요하다고 생각하십니까?', options: ['5', '4', '3', '2', '1'] },
    { question: '11. 혐오 표현도 표현의 자유로 보호받아야 한다고 생각하십니까?', options: ['5', '4', '3', '2', '1'] },
    { question: '12. 북한과의 대화와 협력을 통한 평화 정착이 중요하다고 생각하십니까?', options: ['1', '2', '3', '4', '5'] },
    { question: '13. 한미 동맹을 강화해야 한다고 생각하십니까?', options: ['5', '4', '3', '2', '1'] },
    { question: '14. 부동산 가격 안정을 위해 정부가 강력한 규제를 도입해야 한다고 생각하십니까?', options: ['1', '2', '3', '4', '5'] },
    { question: '15. 사법부의 독립성을 강화해야 한다고 생각하십니까?', options: ['1', '2', '3', '4', '5'] },
    { question: '16. 노동자의 권리를 강화하기 위한 법적 보호가 필요하다고 생각하십니까?', options: ['1', '2', '3', '4', '5'] },
    { question: '17. 한미 방위비 분담금 협상(주한미군 주둔 비용에서 한국이 부담할 금액을 규정하는 협정)에서 대한민국의 부담을 늘여야 한다고 생각하십니까?', options: ['5', '4', '3', '2', '1'] },
    { question: '18. 공영 방송의 독립성과 공정성을 강화해야 한다고 생각하십니까?', options: ['1', '2', '3', '4', '5'] },
    { question: '19. 공공 의료 서비스를 확대해야 한다고 생각하십니까?', options: ['1', '2', '3', '4', '5'] },
    { question: '20. 검찰의 권한을 확대해야 한다고 생각하십니까?', options: ['5', '4', '3', '2', '1'] }
  ];
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태 추가
  const questionRefs = useRef([]);

  const questionsPerPage = 5;
  const startIndex = currentPage * questionsPerPage;
  const currentQuestions = questions.slice(startIndex, startIndex + questionsPerPage);

  useEffect(() => {
    if (questionRefs.current[0]) {
      questionRefs.current[0].scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);

  const handleOptionChange = (questionIndex, value) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = value;
    setAnswers(newAnswers);
    setErrorMessage(""); // 옵션 선택 시 에러 메시지 초기화
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(questions.length / questionsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSubmit = () => {
    if (answers.includes(null)) {
      setErrorMessage("*모든 문항을 선택하셔야 제출하실 수 있습니다.");
      return;
    }
    const score = answers.reduce((acc, answer) => acc + Number(answer), 0);
    navigate('/result', { state: { score } }); // 'result' 페이지로 라우팅하며 상태를 전달
  };

  const isLastPage = currentPage === Math.ceil(questions.length / questionsPerPage) - 1;

  return (
    <PageWrapper>
      <Container>
        <Title>폴스널컬러 테스트</Title>
        <QuestionContainer>
          {currentQuestions.map((q, index) => (
            <QuestionBlock key={index} ref={el => (questionRefs.current[startIndex + index] = el)}>
              <QuestionTitle>{q.question}</QuestionTitle>
              <OptionContainer>
                <Text>동의</Text>
                {q.options.map((opt, optIndex) => (
                  <Option key={optIndex}>
                    <OptionLabel
                      isSelected={answers[startIndex + index] === opt}
                      isGray={optIndex === 2} // 세 번째 동그라미는 회색으로 설정
                      size={
                        optIndex === 0 || optIndex === 4 ? '60px' : // 0번째와 4번째는 60px
                        optIndex === 1 || optIndex === 3 ? '50px' : // 1번째와 3번째는 50px
                        optIndex === 2 ? '40px' : '50px' // 2번째는 40px, 나머지는 50px
                      }
                    >
                      <HiddenRadio
                        name={`question-${startIndex + index}`}
                        value={opt}
                        checked={answers[startIndex + index] === opt}
                        onChange={() => handleOptionChange(startIndex + index, opt)}
                      />
                      {answers[startIndex + index] === opt && <CheckMark />}
                      {opt}
                    </OptionLabel>
                  </Option>
                ))}
                <Text>비동의</Text>
              </OptionContainer>
            </QuestionBlock>
          ))}
        </QuestionContainer>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <ButtonContainer>
          <BackButton onClick={handleBack}>뒤로</BackButton>
          {isLastPage ? (
            <Button onClick={handleSubmit}>제출</Button>
          ) : (
            <NextButton onClick={handleNext}>다음</NextButton>
          )}
        </ButtonContainer>
      </Container>
    </PageWrapper>
  );
};

export default ColorTest;