// pages/LoginPage.jsx
import { useState } from 'react';
import axios from 'axios';

export default function LoginPage({ setIsLoggedIn }) {
  const [masterPassword, setMasterPassword] = useState('');
  const [isSetting, setIsSetting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSetting) {
        await axios.post('http://localhost:3000/set-master', { master: masterPassword });
      }
      await axios.post('http://localhost:3000/login', { master: masterPassword });
      setIsLoggedIn(true);
    } catch (err) {
      alert(err.response?.data?.msg || 'Error logging in.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        <span className="text-sm">Master Password</span>
        <input
          type="password"
          className="mt-1 w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring focus:border-blue-500"
          value={masterPassword}
          onChange={(e) => setMasterPassword(e.target.value)}
          required
        />
      </label>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isSetting}
          onChange={() => setIsSetting(!isSetting)}
          className="accent-blue-500"
        />
        <span className="text-sm">Set as new master password</span>
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold"
      >
        {isSetting ? 'Set & Login' : 'Login'}
      </button>
    </form>
  );
}