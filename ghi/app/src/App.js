import { HomePage } from './pages/HomePage';
import { Navbar } from './components/Navbar';
import './App.css';
import { BirdList } from './components/birds/BirdList';


function App() {
  return (
    <div className="">
      <BirdList />
      {/* <Navbar /> */}
      <HomePage />
    </div>
  );
}

export default App;
