import React, { useState } from 'react';
import { login as loginService } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const res = await loginService({ username, password });
      console.log('Login successful:', res);

      if (res.error) {
        setError(res.message);
        return;
      }

      login(res.token);
    } catch (error: any) {
      console.error('Login failed:', error);
      setError(error.message); // Display the error message in the UI
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Username:
        <input
          type='text'
          value={username}
          onChange={e => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </label>
      <button type='submit'>Login</button>

      {error && <p>Error: {error}</p>}

      <p>
        Don't have an account? <Link to='/signup'>Sign up here</Link>
      </p>
    </form>
  );
};

export default LoginPage;
