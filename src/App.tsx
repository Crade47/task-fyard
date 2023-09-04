import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactsPage from "./pages/ContactsPage";
import ChartsAndMaps from "./pages/ChartsAndMaps";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Sidebar from "./components/Sidebar";

const queryClient = new QueryClient();

function App() {
  return (
    <div className=" h-screen">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Sidebar>
            <Routes>
              <Route path="/" element={<ContactsPage />} />
              <Route path="/visuals" element={<ChartsAndMaps />} />
            </Routes>
          </Sidebar>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
