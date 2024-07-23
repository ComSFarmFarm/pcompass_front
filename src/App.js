import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from './Signin';
import Signup from './Signup';
import Inform from './Inform';
import Main from './Main';
import GlobalStyle from './GlobalStyle'; // Import GlobalStyle

function App() {
    return (
        <Router>
            <GlobalStyle /> {/* Apply GlobalStyle here */}
            <Routes>
                <Route path="/" element={<Signin />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/inform" element={<Inform />} />
                <Route path="/main" element={<Main />} />
            </Routes>
        </Router>
    );
}

export default App;
