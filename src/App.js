import './App.css';
import Break from './components/Break';
import Session from './components/Session';
import Timer from './components/Timer';

function App() {
  return (
    <div className="App">
      <div id='clock-wrapper'>
        <Break />
        <Session />
        <Timer />
      </div>
      <footer className="App-footer">
        developed by <a href='https://www.linkedin.com/in/paulohssousa/'>paulohssousa</a>
      </footer>
    </div>
  );
}

export default App;
