import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

async function loginUser(credentials) {
  try {
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Invalid user data!');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export default function SignIn({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await loginUser({
        email,
        password,
      });
      setToken(token);
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  return (
    <div className="container" id="container">
      <div className="form-container log-in-container">
        <form action="#" onSubmit={handleSubmit}>
          <h1>Login Form</h1>
          <div className="error-container">
            {error && <div className="error-message">{error}</div>}
          </div>
          <div className="social-container">
            <a href="/#" className="social">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="/#" className="social">
              <i className="fa-brands fa-twitter"></i>
            </a>
          </div>
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="/#">Forgot your password?</a>
          <button>Sign In</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="background-image"></div>
          <div className="overlay-panel overlay-right">
            <h1>Welcome, friend!</h1>
            <p>Click Sign In to view your personal dashboard!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

SignIn.propTypes = {
  setToken: PropTypes.func.isRequired,
};
