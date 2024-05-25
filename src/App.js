import React from 'react'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Weather from './components/Weather'; 
import Navbar from './components/Navbar'; 
import Finance from './components/Finance';
import NewsCard from './components/News';

function App() {
  return ( 
    <Router>
      <div className="flex">
        <Navbar />
        <div className="flex-1 p-4">
          <Routes>
            <Route exact path="/" element={
              <>
                <Weather /> 
                <NewsCard />
                <Finance />
              </>
            } />
            <Route path="/weather" element={<Weather />} /> 
            <Route path="/news" element={<NewsCard />} /> 
            <Route path="/finance" element={<Finance />} /> 
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
