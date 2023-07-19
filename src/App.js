// import './App.css';
// import Dashboard from './Page/Dashboard';

// function App() {
//   return (
//     <div>
//       <Dashboard />
//     </div>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './Navigation';
import Dashboard from './Page/Dashboard';
import Employee  from './Page/Employee';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="top-nav">
          <h1>Employee Management System</h1>
        </header>
        <div className='main-container2 '>
          <Navigation />
          <div className="content-container">
            <Routes>
              <Route path="/" element={<Dashboard />} /> 
              <Route path="/ " element={<Employee  />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

