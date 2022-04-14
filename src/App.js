import './App.css';
import Login from './Components/Login';
import NetflixProvider from './Context/netflixContext';

function App() {
  return (
    <div className="App">
      <NetflixProvider>
        <Login />
      </NetflixProvider>
    </div>
  );
}

export default App;
