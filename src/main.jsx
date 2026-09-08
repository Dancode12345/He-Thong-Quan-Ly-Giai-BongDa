import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { TournamentProvider } from "./context/TournamentContext.jsx";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TournamentProvider>
      <App />
    </TournamentProvider>
  </React.StrictMode>
);
