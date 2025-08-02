import { useState } from 'react';
import Login from './components/Login';
import Vault from './components/Vault';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="app-container">
      <h1>Password Saver</h1>
      {isLoggedIn ? <Vault /> : <Login setIsLoggedIn={setIsLoggedIn} />}
    </div>
  );
}
