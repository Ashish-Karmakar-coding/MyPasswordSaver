// App.jsx
import { useState } from 'react';
import LoginPage from './components/Login.jsx';
import VaultPage from './components/Vault.jsx';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      <div className="max-w-xl mx-auto bg-gray-950 rounded-2xl shadow-xl p-6">
        <h1 className="text-3xl font-bold mb-4 text-center text-blue-400">🔐 Password Saver</h1>
        {isLoggedIn ? (
          <VaultPage />
        ) : (
          <LoginPage setIsLoggedIn={setIsLoggedIn} />
        )}
      </div>
    </div>
  );
}
