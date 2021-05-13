import React from 'react';
import './App.css';
import TasksList from './components/TasksList';
import Timer from './components/Timer';

function App() {
  return (
    <div className="App">
      <Timer taskName=""/>
      <TasksList />
    </div>
  );
}

export default App;
