import logo from "./logo.svg";
import "./App.css";
import React, { useEffect } from "react";
import { configureApi } from "./helper/apiHelper";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import SellerPage from "./page/SellerPage";
import BookPage from "./page/BookPage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/sellers">Sellers</Link>
                </li>
                <li>
                  <Link to="/books">Books</Link>
                </li>
              </ul>
            </nav>
            <Routes>
              <Route path="/sellers" element={<SellerPage />} />
              <Route path="/books" element={<BookPage />} />
            </Routes>
          </div>
        </Router>
       
      </header>
    </div>
  );
}

export default App;
