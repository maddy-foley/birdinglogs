import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { Navbar } from './components/Navbar';
import './App.css';
import { BirdDetail } from './components/birds/BirdDetails';
import { BirdPage } from './pages/BirdPage'

import { Login } from './components/accounts/AccountLogin';
import { Logout } from './components/accounts/AccountLogout';
import { Profile } from './components/accounts/AccountProfile';

import { CreateAccount } from './components/accounts/AccountCreate';
import { CreateBird } from './components/birds/BirdCreate';
import { MyBirds } from './components/accounts/AccountBirds';
import { MySightings } from './components/sightings/MySightings';
import { CreateSighting } from './components/sightings/CreateSighting';

import { MyWishes } from './components/wishes/MyWishes';
import { Footer } from './components/Footer';

function App() {

  return (
    <BrowserRouter>
     <Navbar />
     <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="birds">
          <Route path="" element={<BirdPage />} />
          <Route path=":id" element={<BirdDetail />} />
          <Route path="create" element={<CreateBird />} />
          <Route path="me" element={<MyBirds/>}/>
          <Route path=":id/create-sighting" element={<CreateSighting />}/>
        </Route>
        <Route path="account">
          <Route path="login" element={ <Login/>}/>
          <Route path='logout' element={ <Logout />} />
          <Route path="create" element={<CreateAccount />} />
          <Route path="profile" element={ < Profile />} />
        </Route>
        <Route path="sightings">
          <Route path="me" element={<MySightings />}/>
        </Route>
        <Route path="wishes">
          <Route path="me" element={<MyWishes/>}/>
        </Route>
     </Routes>
     <Footer />
    </BrowserRouter>
  );
}

export default App;
