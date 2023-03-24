import { HomePage } from './pages/HomePage';
import { Navbar } from './components/Navbar';
import './App.css';
import { BirdList } from './components/birds/BirdList';
import { BirdPage } from './pages/BirdPage'


function App() {
  return (
    <div className="">
      <BirdPage />
      {/* <Navbar /> */}
    </div>
  );
}

export default App;
