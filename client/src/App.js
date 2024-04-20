import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "./screens/Home/Home";
import ToastNotification from "./components/Toast/ToastNotification";

function App() {
  return (
    <Router>
      <ToastNotification />
      <Home />
    </Router>
  );
}

export default App;
