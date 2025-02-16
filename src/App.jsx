import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // Import Navigate here
import HomePage from "./components/HomePage";
import ResponsePage from "./components/ResponsePage"; // Ensure this import is correct
import { crewList } from "./components/HomePage";  // Import crewList now correctly

const App = () => (
  <Routes>
    {/* HomePage route */}
    <Route path="/" element={<HomePage />} />

    {/* Dynamic routes for each crew */}
    {crewList.map((crew) => (
      <Route
        key={crew.path}
        path={crew.path}
        element={<ResponsePage crew={crew} />}  // Pass crew data as a prop
      />
    ))}

    {/* Catch-all route */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
