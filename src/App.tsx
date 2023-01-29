import React from "react";
import LabinsMap from "./components/LabinsMap";
import NavBar from "./components/NavBar";

import "./App.css";

const App: React.FC = () => {
  return (
    <>
      <NavBar />
      <LabinsMap />
    </>
  );
};

export default App;
