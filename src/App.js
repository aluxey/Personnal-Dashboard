import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Weather from './components/Weather';
import Navbar from './components/Navbar';
import Finance from './components/Finance';
import NewsCard from './components/News';
import FinanceList from "./components/FinanceList";
import Counter from "./components/Counter";
import "./styles/App.css";

function App() {
  return (
      <Router>
        <div className={"body"}>
          <Navbar />
          <div>
            <Routes>
              <Route exact path="/" element={
                <>
                  <Weather />
                </>
              } />
              <Route path="/weather" element={<Weather />} />
              <Route path="/news" element={<NewsCard />} />
              <Route path="/finance" element={
                <>
                  <Finance />
                  <FinanceList />
                </>
              } />
              <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
          </div>
        </div>
      </Router>
  );
}

export default App;
