import React from 'react';
import { useLocation } from 'react-router-dom';

const NextPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const score = queryParams.get('score');

  return (
    <div>
      <h1>다음 페이지</h1>
      <p>점수: {score}</p>
    </div>
  );
};

export default NextPage;