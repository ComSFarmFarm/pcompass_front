import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalStyle from './components/GlobalStyle'; // Import GlobalStyle
import Signin from './pages/Login';
import Signup from './pages/Signup';
import First from './pages/First';
import Test from './pages/Test';
import Main from './pages/Main';


function App() {
    return (
        <Router>
            <GlobalStyle /> {/* Apply GlobalStyle here */}
            <Routes>
                <Route path="/" element={<Signin />} />
                <Route path="/login" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/first" element={<First />} />
                <Route path="/test" element={<Test />} />
                <Route path="/main" element={<Main />} />           
            </Routes>
        </Router>
    );
}

export default App;
