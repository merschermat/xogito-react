import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Project } from './components/project/Project';
import { Header } from './components/header/Header';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { iniateValue } from './reducers/projectSlice';
import Projects from './projects.json'
import Users from './users.json';
function App() {

  const dispatch = useAppDispatch();


  useEffect(() => {
    //@ts-ignore
    Projects.map(proj => proj.owner = Users.find(user => user.id == proj.owner))
    //@ts-ignore
    dispatch(iniateValue(Projects))
  })

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
