import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider} from "./contexts/DataContext";
import { ToggleProvider } from "./contexts/ToggelContext";
import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <DataProvider>
        <ToggleProvider>
          <div className="text-white min-h-screen bg-gradient-to-b from-[#0c1631] to-[#101a3b]">
            <App />
          </div>
        </ToggleProvider>
      </DataProvider>
    </AuthProvider>
  </React.StrictMode>
);
