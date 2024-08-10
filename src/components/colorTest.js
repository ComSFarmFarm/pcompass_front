import React, { useState, useRef, useEffect } from 'react';
import './colorTest.css'; // 스타일링
import PageWrapper from './PageWrapper';
import { useNavigate } from 'react-router-dom';

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
};

const handleNext = () => {
  if (currentPage < Math.ceil(questions.length / questionsPerPage) - 1) {
    setCurrentPage(currentPage + 1);
  } else {
    handleSubmit(); // If on the last page, submit the answers
  }
};

const handlePrevious = () => {
  if (currentPage > 0) {
    setCurrentPage(currentPage - 1);
  }
};

const handleSubmit = () => {
  if (answers.some(answer => answer === null)) {
    alert('모든 질문에 답변해 주세요.');
    return;
  }

  let score = answers.reduce((acc, curr) => acc + (curr || 0), 0);
  alert('퀴즈가 끝났습니다!');
  navigate(`/nextPage?score=${score}`);
};

return (
  <PageWrapper>
      <h1>폴스널컬러 테스트</h1>
      <div className="question-container">
        {currentQuestions.map((question, qIndex) => (
          <div
            key={qIndex}
            className="question-block"
            ref={(el) => (questionRefs.current[qIndex] = el)} // Assign ref to each question block
          >
            <h2>{question.question}</h2>
            <div className="option-container">
              <h3>동의</h3>
              {question.options.map((option, index) => (
                <div key={index} className="option">
                  <input
                    type="radio"
                    id={`option${startIndex + qIndex}-${index}`}
                    name={`question${startIndex + qIndex}`}
                    value={option}
                    checked={answers[startIndex + qIndex] === parseInt(option)}
                    onChange={(e) => handleOptionChange(startIndex + qIndex, parseInt(e.target.value))}
                  />
                  <label htmlFor={`option${startIndex + qIndex}-${index}`} className="option-label"></label>
                </div>
              ))}
              <h3>비동의</h3>
            </div>
          </div>
        ))}
      </div>
      <div className="button-container">
        {currentPage > 0 && (
          <button onClick={handlePrevious} className="back-button">
            뒤로가기
          </button>
        )}
        <button onClick={handleNext} className="next-button">
          {currentPage < Math.ceil(questions.length / questionsPerPage) - 1 ? '다음' : '제출'}
        </button>
      </div>
  </PageWrapper>
);
};

export default ColorTest;