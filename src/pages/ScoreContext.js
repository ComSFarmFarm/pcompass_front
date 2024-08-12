import React, { createContext, useState, useContext } from 'react';

// ScoreContext 생성
const ScoreContext = createContext();

// ScoreProvider 컴포넌트 정의
export const ScoreProvider = ({ children }) => {
    const [score, setScore] = useState(0); // 초기 점수는 0으로 설정

    return (
        <ScoreContext.Provider value={{ score, setScore }}>
            {children}
        </ScoreContext.Provider>
    );
};

// useScore 커스텀 훅 정의
export const useScore = () => {
    const context = useContext(ScoreContext);

    if (context === undefined) {
        throw new Error('useScore must be used within a ScoreProvider');
    }

    return context;
};
