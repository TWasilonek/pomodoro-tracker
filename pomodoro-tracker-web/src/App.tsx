import './App.css';
import Home from './containers/Home';
import TopBar from './components/TopBar';
import { AppProvider } from './store/AppContext';

function App() {
  return (
    <AppProvider>
      <TopBar />
      <div className="App">
        <Home />
      </div>
    </AppProvider>
  );
}

export default App;
