import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "./screens/Home/Home";
import ToastNotification from "./components/Toast/ToastNotification";
import { useQuery } from "@tanstack/react-query";

function App() {
  const { data, isLoading } = useQuery({
    queryKey: ["todo"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
        res.json()
      ),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Router>
      <ToastNotification />
      <Home />
    </Router>
  );
}

export default App;
