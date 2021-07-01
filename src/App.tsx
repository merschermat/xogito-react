import React from 'react';
import logo from './logo.svg';
import { Project } from './components/project/Project';
import { Header } from './components/header/Header';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <body className="App-body">
        <Project />
      </body>
    </div>
  );
}

export default App;
