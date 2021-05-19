import React from 'react';
import './App.css';
import Tasks from './components/Tasks';
import Timer from './components/Timer';
import { AppProvider } from './store/AppContext';

function App() {
  return (
    <AppProvider>
      <div className="App">
        <Timer taskDescription="Learn Programming" />
        <Tasks />
      </div>
    </AppProvider>
  );
}

export default App;
