import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalStyle from './GlobalStyle'; // Import GlobalStyle
import Signin from './Signin';
import Signup from './Signup';
import Inform from './Inform';
import Main from './Main';
import Test from './Test';
import Map from './Map';


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
                <Route path="/test" element={<Test />} />
                <Route path="/map" element={<Map />} />           
            </Routes>
        </Router>
    );
}

export default App;
