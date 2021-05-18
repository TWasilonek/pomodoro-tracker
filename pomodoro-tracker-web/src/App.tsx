import React from 'react';
import './App.css';
import TasksList from './components/Tasks/TasksList';
import Timer from './components/Timer';
import { AppProvider } from './store/AppContext';

function App() {
  return (
    <AppProvider>
      <div className="App">
        <Timer taskDescription=""/>
        <TasksList />
      </div>
    </AppProvider>
  );
}

export default App;
