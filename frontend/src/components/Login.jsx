import { useState } from 'react';
import API from '../api';

export default function Login({ setIsLoggedIn }) {
  const [master, setMaster] = useState('');
  const [message, setMessage] = useState('');

  const login = async () => {
    try {
      const res = await API.post('/login', { master });
      setMessage(res.data.msg);
      setIsLoggedIn(true);
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Login failed');
    }
  };

  const setMasterPassword = async () => {
    try {
      const res = await API.post('/set-master', { master });
      setMessage(res.data.msg);
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Error setting master password');
    }
  };

  return (
    <div>
      <h2>Enter Master Password</h2>
      <input
        type="password"
        placeholder="Master Password"
        value={master}
        onChange={(e) => setMaster(e.target.value)}
      />
      <br />
      <button onClick={login}>Login</button>
      <button onClick={setMasterPassword}>Set Master</button>
      <p>{message}</p>
    </div>
  );
}
