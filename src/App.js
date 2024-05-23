import React from 'react'; 
import './index.css';
import Weather from './components/Weather';
import TBMUpdatesCard from './components/News';

function App() {
  return (
    <div className="App">
      <Weather />
      <TBMUpdatesCard />
    </div>
  );
}

export default App;