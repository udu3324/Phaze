import './styles/App.css';
import Maze from './Maze'
import Up from './Up';
import Config from './Config';
import Down from './Down';

function App() {
  return (
    <div className="App">
      <Config />
      <header className="App-header">
        <Up />
        <Maze />
        <Down />
      </header>
    </div>
  );
}

export default App;
