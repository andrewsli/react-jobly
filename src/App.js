import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import Nav from "./Nav";
import Routes from "./Routes";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Nav />
          <Routes />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
