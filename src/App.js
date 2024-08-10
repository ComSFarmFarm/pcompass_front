import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalStyle from './components/GlobalStyle'; // Import GlobalStyle
import Login from './pages/Login';
import Signup from './pages/Signup';
import First from './pages/First';
import Test from './pages/Test';
import Main from './pages/Main';
import Quiz from './pages/Quiz';
import News from './pages/News';
import Promises from './pages/Promises';
import Search from './pages/Search';
import Result from './pages/Result';


function App() {
    return (
        <Router>
            <GlobalStyle /> {/* Apply GlobalStyle here */}
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/first" element={<First />} />
                <Route path="/test" element={<Test />} />
                <Route path="/main" element={<Main />} />    
                <Route path="/quiz" element={<Quiz />} />  
                <Route path="/News" element={<News />} />         
                <Route path="/promises" element={<Promises />} />    
                <Route path="/search" element={<Search />} />    
                <Route path="/result" element={<Result />} />  
            </Routes>
        </Router>
    );
}

export default App;
