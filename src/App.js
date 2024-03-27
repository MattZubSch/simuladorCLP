import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from './components/Header.js';
import SimulatorScreen from './pages/simulatorScreen.js';
import MainPage from './pages/main.js';
import { AppProvider } from './pages/appContext.js';

function App() {
  return (
    <BrowserRouter className="App">
      <Header />
        <AppProvider>
          <Routes>
              <Route exact path="/" element={<MainPage />} />
              <Route path="/simulator" element={<SimulatorScreen />} /> 
          </Routes>
        </AppProvider> 
    </BrowserRouter>
  );
}

export default App;
