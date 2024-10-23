import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Weather from './components/Weather';
import WeatherFull from './components/WeatherFull';
import { TwitchAuthHandler, TwitchLogin } from './components/GetToken';
import './styles/App.css';
import TwitterTimeline from './components/Twitter';

function App() {
  return (
    <Router>
      <div className="body">
        <Navbar />
        <div>
          <Routes>
            {/* Other routes */}
            <Route path="/" element={<Weather />} />
            <Route path="/weather" element={<WeatherFull />} />

            {/* This is where the Twitch login button is rendered */}
            <Route path="/twitch-login" element={<TwitchLogin />} />

            {/* This is the OAuth callback handler */}
            <Route path="/twitch-auth" element={<TwitchAuthHandler />} />

            <Route path="/twitter" element={<TwitterTimeline />} />

            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
