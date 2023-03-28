import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { Navbar } from './components/Navbar';
import './App.css';
import { BirdList } from './components/birds/BirdList';
import { BirdDetail } from './components/birds/BirdDetails';
import { BirdPage } from './pages/BirdPage'


import { Login } from './components/accounts/accountLogin';
import { Logout } from './components/accounts/accountLogout';
import { Profile } from './components/accounts/accountProfile';
import GetToken from './components/Token';
import { useEffect, useState } from 'react';



function App() {
  return (
    <BrowserRouter>
     <Navbar />
     <GetToken />
     <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="birds">
          <Route path="" element={<BirdPage />} />
          <Route path=":id" element={<BirdDetail />} />
        </Route>
        <Route path="account">
          <Route path="login" element={ <Login/>}/>
          <Route path='logout' element={ <Logout />} />
          <Route path="profile" element={ < Profile />} />
        </Route>
     </Routes>
    </BrowserRouter>
  );
}

export default App;
