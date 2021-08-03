import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppShell from "components/AppShell";

import AppRoutes from "Router";

import "styles/index.css";

function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <AppRoutes />
      </AppShell>
    </BrowserRouter>
  );
}

export default App;
