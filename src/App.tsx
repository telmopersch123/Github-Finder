import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <div className="app-container">
        <h1>Github Finder</h1>
        <Outlet />
      </div>
    </>
  );
}

export default App;
