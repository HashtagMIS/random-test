import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ApiPage from "./components/ApiPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <ApiPage />
    </div>
  );
}

export default App;
