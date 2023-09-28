import Navbar from "./Components/Navbar";
import Weather from "./Components/Weather";
import logo from "./logo.svg";
import "./Styles/App.css";

function App() {
  return (
    <div style={{ background: "#d7e5ca", height: "100vh" }}>
      <Navbar />
      <Weather />
    </div>
  );
}

export default App;
