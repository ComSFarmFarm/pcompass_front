import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ChevronLeftIcon } from '../img/chevron-left.svg'; // SVG 파일 import
import { ReactComponent as SearchIcon } from '../img/search.svg'; // 새로운 SVG 파일 import
import { ReactComponent as ListIcon } from '../img/list.svg';
import { ReactComponent as PlusIcon } from '../img/plus.svg'; // 추가할 SVG 파일 import
import senderImage from '../img/galbi.jpg'; // 원래 sender 이미지 import
import galbiImage from '../img/galbipic.png'; // 텍스트 박스 안에 들어갈 이미지 import

// Styled components
const PageContainer = styled.div`
    height: 100vh; /* 전체 화면 높이 */
    background-color: #222224; /* 전체 페이지 배경색 */
    display: flex;
    flex-direction: column;
`;

const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1; /* ChatContainer가 페이지의 남은 공간을 차지하도록 함 */
`;

const Header = styled.div`
    background-color:  #222224; /* 약간 반투명한 헤더 배경색 */
    padding: 15px; /* 헤더 세로 길이 증가 */
    display: flex;
    flex-direction: column; /* 헤더 내부 요소를 수직으로 배치 */
    align-items: center; /* 가운데 정렬 */
    justify-content: center; /* 가운데 정렬 */
    position: relative; /* 헤더에 버튼을 절대 위치로 배치하기 위해 설정 */
`;

const HeaderTitle = styled.div`
    font-size: 30px;
    color: white; /* 텍스트 색상 흰색 */
    text-align: center; /* 텍스트 가운데 정렬 */
    margin-top: 15px;
    margin-bottom: 5px; /* 제목과 전화번호 사이에 공간 추가 */
`;

const HeaderPhone = styled.div`
    font-size: 20px;
    color: white; /* 전화번호 색상 흰색 */
`;

const HeaderButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: white; /* 버튼 색상 흰색 */
    position: absolute;
    left: 15px; /* 왼쪽에 위치하게 하기 위해 추가 */
    top: 15px; /* 상단에 위치하게 하기 위해 추가 */
`;

const ChevronIcon = styled(ChevronLeftIcon)`
    width: 30px;
    height: 30px;
    fill: white; /* 아이콘 색상 흰색 */
    transform: rotate(180deg); /* 아이콘을 왼쪽으로 뒤집기 */
`;

const SearchIconStyled = styled(SearchIcon)`
    width: 24px;
    height: 24px;
    fill: white; /* 아이콘 색상 흰색 */
`;

const ListIconStyled = styled(ListIcon)`
    width: 24px;
    height: 24px;
    fill: white; /* 아이콘 색상 흰색 */
`;

const PlusIconStyled = styled(PlusIcon)`
    width: 24px;
    height: 24px;
    fill: white; /* 아이콘 색상 흰색 */
`;

const IconContainer = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    right: 15px; /* 오른쪽에 위치하게 하기 위해 추가 */
    top: 15px; /* 상단에 위치하게 하기 위해 추가 */
`;

const IconButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: white; /* 아이콘 색상 흰색 */
    margin-left: 15px; /* 아이콘 사이에 여백 추가 */
`;

const ComboBoxContainer = styled.div`
    display: flex;
    justify-content: left;
    margin-bottom: 10px;
    margin-left: 10px;
    position: relative;
`;

const ComboBox = styled.select`
    padding: 10px;
    border-radius: 5px;
    border: none;
    outline: none;
    font-size: 16px;
    background-color: #2D2D2D;
    color: white;
    cursor: pointer;
`;

const MessageList = styled.div`
    flex: 1; /* 남은 공간을 모두 차지하도록 설정 */
    overflow-y: auto; /* 수직 스크롤 가능하도록 설정 */
    padding: 10px;
`;

const Message = styled.div`
    display: flex;
    flex-direction: column; /* Sender와 Text가 수직 방향으로 배치되도록 설정 */
    margin-bottom: 20px;
    padding-left: 20px;
`;

const MessageContent = styled.div`
    display: flex;
    flex-direction: column; /* Sender와 Text가 위아래로 배치되도록 설정 */
    align-items: flex-start; /* 상단에 정렬되도록 설정 */
    margin-bottom: 20px;
`;

const TextBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 40px;
    background-color: #f1f1f1;
    border-radius: 10px;
    padding: 10px;
    word-wrap: break-word;
    max-width: 80%;
    color: #000000;
    position: relative; /* 시간 텍스트 위치를 위한 상대적 위치 설정 */
`;

const TimeStamp = styled.div`
    font-size: 12px;
    color: #888888; /* 시간 텍스트 색상 */
    position: absolute;
    bottom: -20px; /* 텍스트박스 아래에 위치하도록 설정 */
    right: 10px; /* 텍스트박스 오른쪽 끝에 위치하도록 설정 */
`;

const Sender = styled.div`
    display: flex;
    flex-direction: row; /* Sender 내부 요소를 수평으로 배치 */
    align-items: center; /* 이미지와 텍스트를 수직 가운데 정렬 */
`;

const SenderImage = styled.img`
    width: 40px; /* 이미지 크기 조정 */
    height: 40px; /* 이미지 크기 조정 */
    border-radius: 50%; /* 원형으로 만들기 */
    margin-right: 10px; /* 이미지와 텍스트 사이의 간격 */
`;

const SenderText = styled.div`
    font-size: 16px; /* 텍스트 크기 조정 */
`;

const ReceiverMessage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end; /* 오른쪽 정렬 */
    margin-bottom: 20px;
    padding-right: 20px;
`;

const ReceiverTextBox = styled.div`
    display: flex;
    margin-top: 20px;
    flex-direction: column;
    background-color: yellow; /* 노란색 배경 */
    border-radius: 10px;
    padding: 10px;
    word-wrap: break-word;
    max-width: 80%;
    color: #000000;
    position: relative; /* 시간 텍스트 위치를 위한 상대적 위치 설정 */
`;

const ReceiverTimeStamp = styled.div`
    font-size: 12px;
    color: #888888; /* 시간 텍스트 색상 */
    position: absolute;
    bottom: -20px; /* 텍스트박스 아래에 위치하도록 설정 */
    left: 10px; /* 텍스트박스 왼쪽 끝에 위치하도록 설정 */
`;

const ImageAboveText = styled.img`
    width: 300px; /* 위 이미지 크기 조정 */
    height: auto; /* 높이는 자동 조정 */
    margin-bottom: 10px; /* 이미지와 텍스트 사이의 간격 추가 */
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    border-top: 1px solid gray;
    background-color: #272729; /* 입력창 배경색 */
`;

const PlusButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    fill: #2D2D2D; /* 아이콘 색상 흰색 */
    margin-right: 10px; /* 아이콘과 입력창 사이에 여백 추가 */
`;

const InputField = styled.input`
    flex: 1;
    background-color: #313133;
    padding: 15px;
    border-radius: 20px;
    margin-right: 10px;
`;

const SendButton = styled.button`
    background-color: #313133;
    color: white;
    border: none;
    padding: 15px;
    border-radius: 20px;
    cursor: pointer;
`;

const BoxContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
`;

const Box = styled.div`
    background-color: #d3d3d3; /* 상자 배경색 */
    border-radius: 5px;
    padding: 10px;
    width: 48%; /* 상자의 너비 설정 */
    text-align: center; /* 텍스트 가운데 정렬 */
`;

const DownloadLink = styled.p`
    color: blue; /* 텍스트 색상 파란색 */
    text-decoration: underline; /* 밑줄 추가 */
`;

const LeftBox = styled(Box)`
    /* 왼쪽 상자 스타일 추가 (필요시) */
`;

const RightBox = styled(Box)`
    /* 오른쪽 상자 스타일 추가 (필요시) */
`;

const ChatMessage = () => {
    const [inputValue, setInputValue] = useState('');
    const [selectedOption, setSelectedOption] = useState('전체');
    const navigate = useNavigate(); // useNavigate 훅을 사용

    const handleLogoClick = () => {
        navigate('/kakaochat'); // '/chat' 경로로 이동
    };
    const handleSend = () => {
        if (inputValue.trim()) {
            // Handle sending message
            setInputValue('');
        }
    };

    return (
        <PageContainer>
            <ChatContainer>
                <Header>
                    <HeaderButton>
                        <ChevronIcon onClick={handleLogoClick}/>
                    </HeaderButton>
                    <HeaderTitle>광화문석갈비</HeaderTitle>
                    <HeaderPhone>02-539-0107</HeaderPhone>
                    <IconContainer>
                        <IconButton>
                            <SearchIconStyled />
                        </IconButton>
                        <IconButton>
                            <ListIconStyled />
                        </IconButton>
                    </IconContainer>
                </Header>
            
                <MessageList>
                    <Message>
                    <MessageContent>
                    <Sender>
                                <SenderImage src={senderImage} alt="Galbi" />
                                <SenderText>광화문석갈비</SenderText>
                            </Sender>
                            <TextBox>
                                <p>'광화문석갈비' 채널을 추가해 주셔서 감사합니다.</p>
                                <p>앞으로 다양한 소식과 혜택/정보를 메시지로 받을 수 있습니다.</p>
                                <p>채널 추가 일시(한국시간 기준): 2024년 03월 13일 12:11</p>
                                <p>수신거부: 홈&gt;채널 차단</p>
                                <TimeStamp>12:11</TimeStamp>
                            </TextBox>
                            </MessageContent>
                        <MessageContent>
                            <Sender>
                                <SenderImage src={senderImage} alt="Galbi" />
                                <SenderText>광화문석갈비</SenderText>
                            </Sender>
                            <TextBox>
                                <ImageAboveText src={galbiImage} alt="Galbi" />
                                <p>좋은 고기를 <br /> 태우지 않고 먹을 수 없을까?</p>
                                <br />
                                <p>고기를 먹을 때 <br /> 웃에 냄새가 안 뻘 수 없을까?</p>
                                <br />
                                <p>이렇게 시작된 광석씨네 이야기</p>
                                <br />
                                <DownloadLink>매거진 다운로드 링크</DownloadLink> {/* 링크 텍스트에 스타일 적용 */}
                                <BoxContainer>
                                    <LeftBox>코엑스 점</LeftBox>
                                    <RightBox>D타워점</RightBox>
                                </BoxContainer>
                                <TimeStamp>12:13</TimeStamp>
                            </TextBox>
                        </MessageContent>
                    </Message>
                    <ReceiverMessage>
                        <ReceiverTextBox>
                            <p>오른쪽에 메뉴 보여주세요.</p>
                            <ReceiverTimeStamp>12:13</ReceiverTimeStamp>
                        </ReceiverTextBox>
                    </ReceiverMessage>
                </MessageList>
                
                <ComboBoxContainer>
                    <ComboBox
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                    >
                        <option value="전체">전체</option>
                        <option value="광고">광고</option>
                        <option value="알림 메세지">알림 메세지</option>
                    </ComboBox>
                </ComboBoxContainer>
                <InputContainer>
                    <PlusButton>
                        <PlusIconStyled />
                    </PlusButton>
                    <InputField
                        type="text"
                        placeholder="챗봇에게 메시지 보내기"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <SendButton onClick={handleSend}>전송</SendButton>
                </InputContainer>
            </ChatContainer>
        </PageContainer>
    );
};

export default ChatMessage;