import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './Navigation';
import Role from './Page/Role';
import Employee  from './Page/Employee';
import './App.css';

function App() {
  return (
    <Router>
      <div className="outer-main-div">
        <div className="outer-nav">
          <div>
            <div className="main-nav">
            <h1>Employee Management System</h1>
            </div>
          </div>
        </div>
        <div className='main-non-nav '>
          <Navigation />
          <div className="main-area">
            <Routes>
              <Route path="/" element={<Role />} /> 
              <Route path="/employee" element={<Employee  />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

