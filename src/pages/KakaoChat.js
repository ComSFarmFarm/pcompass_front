import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';  // useNavigate 훅을 import
import searchIcon from '../img/search.svg';
import chatIcon from '../img/kakao.svg';
import musicIcon from '../img/music.svg';
import settingsIcon from '../img/settings.svg';
import kakaoLogo from '../img/kakaologo.png';
import personIcon from '../img/person.svg';

// Styled components
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: white;
    padding: 20px;
`;

const Header = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 10px;
    position: relative;
`;

const ChatHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding-bottom: 10px;
    margin-bottom: 20px;
`;

const IconsContainer = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    justify-content: flex-end;
    gap: 15px;
    padding: 10px;
`;

const Icon = styled.img`
    width: 24px;
    height: 24px;
    cursor: pointer;
`;

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 20px;
    padding: 10px;
    background-color: #ffffff;
    border-radius: 10px;
    position: relative;
    cursor: pointer; /* 클릭 가능한 요소로 표시 */
`;

const Title = styled.h1`
    font-size: 50px;
    font-weight: bold;
    color: #000000;
    margin: 0;
`;

const Text = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
`;

const TextTitle = styled.h1`
    font-size: 30px;
    font-weight: bold;
    color: #000000;
    margin: 0;
`;

const Subtitle = styled.p`
    font-size: 14px;
    color: #7b7b7b;
    margin: 5px 0;
`;

const Logo = styled.img`
    width: 50px;
    height: 50px;
    margin-right: 10px;
    border-radius: 15px;
`;

const NotificationBadge = styled.div`
    background-color: #ff5c00;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    position: absolute;
    bottom: 10px;
    right: 10px;
`;

const TimeStamp = styled.span`
    font-size: 14px;
    color: #7b7b7b;
    position: absolute;
    top: 10px;
    right: 10px;
`;

const ChatList = styled.div`
    width: 100%;
    flex: 1;
    padding: 10px 0;
`;

const Footer = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    padding: 10px 0;
    border-top: 1px solid #e2e2e0;
`;

const FooterIcon = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    color: #000;
`;

const FooterText = styled.span`
    font-size: 12px;
    margin-top: 10px;
`;

// React component
export default function KakaoChat() {
    const navigate = useNavigate(); // useNavigate 훅을 사용

    const handleLogoClick = () => {
        navigate('/chat'); // '/chat' 경로로 이동
    };

    return (
        <Wrapper>
            <Header>
                <IconsContainer>
                    <Icon src={searchIcon} alt="Search Icon" />
                    <Icon src={chatIcon} alt="Chat Icon" />
                    <Icon src={musicIcon} alt="Music Icon" />
                    <Icon src={settingsIcon} alt="Settings Icon" />
                </IconsContainer>
                <ChatHeader>
                    <Title>Chats</Title>
                    <LogoContainer onClick={handleLogoClick}> {/* 클릭 시 handleLogoClick 호출 */}
                        <Logo src={kakaoLogo} alt="KakaoTalk Logo" />
                        <Text>
                            <TextTitle>KakaoTalk</TextTitle>
                            <Subtitle>Please check My Kakao Account Info</Subtitle>
                        </Text>
                        <NotificationBadge>1</NotificationBadge>
                        <TimeStamp>21:22</TimeStamp>
                    </LogoContainer>
                    {/* Additional "notification" containers */}
                    <LogoContainer>
                        <Logo src={kakaoLogo} alt="KakaoTalk Logo" />
                        <Text>
                            <TextTitle>KakaoTalk</TextTitle>
                            <Subtitle>New message received</Subtitle>
                        </Text>
                        <NotificationBadge>2</NotificationBadge>
                        <TimeStamp>21:25</TimeStamp>
                    </LogoContainer>
                    <LogoContainer>
                        <Logo src={kakaoLogo} alt="KakaoTalk Logo" />
                        <Text>
                            <TextTitle>KakaoTalk</TextTitle>
                            <Subtitle>Reminder: Check your profile</Subtitle>
                        </Text>
                        <NotificationBadge>3</NotificationBadge>
                        <TimeStamp>21:30</TimeStamp>
                    </LogoContainer>
                </ChatHeader>
            </Header>
            <ChatList>
            </ChatList>
            <Footer>
                <FooterIcon>
                    <Icon src={personIcon} alt="Person Icon" />
                    <FooterText>Friends</FooterText>
                </FooterIcon>
                <FooterIcon>
                    <Icon src={chatIcon} alt="Chat Icon" />
                    <FooterText>Chats</FooterText>
                </FooterIcon>
                <FooterIcon>
                    <Icon src={searchIcon} alt="Search Icon" />
                    <FooterText>Search</FooterText>
                </FooterIcon>
                <FooterIcon>
                    <Icon src={settingsIcon} alt="Settings Icon" />
                    <FooterText>Settings</FooterText>
                </FooterIcon>
            </Footer>
        </Wrapper>
    );
}
