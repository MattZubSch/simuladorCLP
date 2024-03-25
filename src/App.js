import './App.css';
import Header from './components/Header.js';
import MainPage from './pages/main.js';
import RenderMatch from './components/renderMatches.js';
import MatchRender from './components/MatchRender.js'
import SimulatorScreen from './pages/simulatorScreen.js';

function App() {
  return (
    <div className="App">
      <Header />
      {/* <MainPage /> */}
      <SimulatorScreen />
      {/* <MainPage />
      <RenderMatch /> */}
      {/* <MatchRender /> */}
    </div>
  );
}

export default App;
