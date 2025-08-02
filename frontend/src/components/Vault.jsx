import { useEffect, useState } from 'react';
import API from '../api';

export default function Vault() {
  const [accounts, setAccounts] = useState([]);
  const [form, setForm] = useState({ platform: '', username: '', password: '' });

  const loadAccounts = async () => {
    try {
      const res = await API.get('/accounts');
      setAccounts(res.data);
    } catch (err) {
      alert('Error loading accounts');
    }
  };

  const saveAccount = async () => {
    if (!form.platform || !form.username || !form.password) {
      alert('All fields required');
      return;
    }
    try {
      await API.post('/accounts', form);
      setForm({ platform: '', username: '', password: '' });
      loadAccounts();
    } catch (err) {
      alert('Error saving account');
    }
  };

  const deleteAccount = async (platform) => {
    try {
      await API.delete(`/accounts/${platform}`);
      loadAccounts();
    } catch (err) {
      alert('Error deleting');
    }
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  return (
    <div>
      <h2>Vault</h2>
      <input
        type="text"
        placeholder="Platform"
        value={form.platform}
        onChange={(e) => setForm({ ...form, platform: e.target.value })}
      />
      <input
        type="text"
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="text"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <br />
      <button onClick={saveAccount}>Save</button>

      <div style={{ marginTop: '20px' }}>
        {accounts.map((acc) => (
          <div key={acc.platform} style={{ background: '#eee', padding: '10px', marginTop: '10px' }}>
            <p><strong>{acc.platform}</strong></p>
            <p>Username: {acc.username}</p>
            <p>Password: {acc.password}</p>
            <button onClick={() => deleteAccount(acc.platform)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
