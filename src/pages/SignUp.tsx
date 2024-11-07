import React, { useState } from 'react';
import { signup } from '../services/authService';
import { Link } from 'react-router-dom';

const SignUp: React.FC = () => {
  const [username, setName] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signup({ username, password });
      console.log('Registration successful:', res);

      setSuccessMessage(res.message);
    } catch (error) {
      console.error('Registration failed:', error);
      // Maneja el error, como mostrar un mensaje de error en la UI
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <label>
        Username:
        <input
          type='text'
          value={username}
          onChange={e => setName(e.target.value)}
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
      <button type='submit'>Sign Up</button>

      {successMessage && (
        <p>
          Success: {successMessage}, <Link to='/login'>Log in here</Link>
        </p>
      )}

      <p>
        Allready have and account? <Link to='/login'>Log in here</Link>
      </p>
    </form>
  );
};

export default SignUp;
