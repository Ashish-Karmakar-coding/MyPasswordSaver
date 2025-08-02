// pages/VaultPage.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function VaultPage() {
  const [service, setService] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [entries, setEntries] = useState([]);

  const fetchPasswords = async () => {
    const res = await axios.get('http://localhost:3000/passwords');
    setEntries(res.data);
  };

  useEffect(() => {
    fetchPasswords();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/save-password', {
        service,
        username,
        password,
      });
      setService('');
      setUsername('');
      setPassword('');
      fetchPasswords();
    } catch (err) {
      alert(err.response?.data?.msg || 'Error saving password.');
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSave} className="space-y-4">
        <input
          type="text"
          placeholder="Service (e.g., Facebook)"
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
          value={service}
          onChange={(e) => setService(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-green-600 hover:bg-green-700 rounded text-white font-semibold"
        >
          Save Password
        </button>
      </form>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Saved Passwords:</h2>
        {entries.map((entry, idx) => (
          <div
            key={idx}
            className="bg-gray-800 p-4 rounded text-sm border border-gray-700"
          >
            <p><strong>Service:</strong> {entry.service}</p>
            <p><strong>Username:</strong> {entry.username}</p>
            <p><strong>Password:</strong> {entry.password}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
