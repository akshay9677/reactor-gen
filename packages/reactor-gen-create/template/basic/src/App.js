import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>Welcome to your React app</h3>
        <p>
          View{" "}
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>{" "}
          documentation for editing your project <br />
          Check out my
          <a
            className="App-link"
            href="https://github.com/akshay9677"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            work
          </a>{" "}
        </p>
      </header>
    </div>
  );
}

export default App;
