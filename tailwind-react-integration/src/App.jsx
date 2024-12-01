import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <div className="App">
      {/* Optional: Add a background and layout for the page */}
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <UserProfile />
      </div>
    </div>
  );
}

export default App;