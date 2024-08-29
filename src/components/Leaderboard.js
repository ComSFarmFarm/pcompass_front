import React from 'react';
import styled from 'styled-components';

const LeaderboardWrapper = styled.div`
    background-color: #282c34;
    color: #fff;
    padding: 30px;
    border-radius: 15px;
    width: 80%;
    max-width: 600px;
    margin: 0 auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    position: relative;
    margin-top: 100px;
    margin-bottom: -52px;
`;

const LeaderboardTitle = styled.h2`
    text-align: center;
    color: #A956FC;
    margin-bottom: 20px;
    font-size: 36px;
    font-weight: bold;
`;

const LeaderboardList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const LeaderboardItem = styled.li`
    display: flex;
    justify-content: space-between;
    padding: 15px;
    border-bottom: 1px solid #444;
    font-size: 24px;
    font-weight: bold;
    background-color: ${props => props.isCurrentUser ? '#6e1aab' : 'transparent'};
    color: ${props => props.isCurrentUser ? '#fff' : '#fff'};
    position: relative;

    &:last-child {
        border-bottom: none;
    }

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: ${props => props.isCurrentUser ? '5px' : '0'};
        height: 100%;
        background-color: #A956FC;
        transition: width 0.3s;
    }
`;

const Leaderboard = ({ data, currentUser }) => {
    return (
        <LeaderboardWrapper>
            <LeaderboardTitle>순위표</LeaderboardTitle>
            <LeaderboardList>
                {data.map((user, index) => (
                    <LeaderboardItem
                        key={index}
                        isCurrentUser={user.name === currentUser}
                    >
                        <span>{index + 1}. {user.name}</span>
                        <span>{user.score}점</span>
                    </LeaderboardItem>
                ))}
            </LeaderboardList>
        </LeaderboardWrapper>
    );
};

export default Leaderboard;
