'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import CapitalOne from '../icons/Capital-One-Logo.png';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './auth.module.css'; 

const AuthPage: React.FC = () => {
  const pathName = usePathname();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSignInClick = () => {
    if (username.trim() === '') {
      setUsernameError('This field is required');
    } else {
      setUsernameError('');
    }

    if (password.trim() === '') {
      setPasswordError('This field is required');
    } else {
      setPasswordError('');
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px',
    fontSize: '14px',
    border: `1px solid ${usernameError ? 'red' : '#ccc'}`,
    boxSizing: 'border-box',
    borderRadius: '5px',
    marginBottom: '20px',
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#0070f3',
    color: '#fff',
    padding: '15px',
    fontSize: '18px',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    marginBottom: '20px',
  };

  const linkStyle: React.CSSProperties = {
    color: '#0070f3',
    textDecoration: 'underline',
    cursor: 'pointer',
    marginTop: '25px',
    marginBottom: '10px',
    display: 'block',
  };


  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1, padding: '20px', height: '50vh' }}>
        <Image src={CapitalOne} alt="photo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>
      <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
        <h3 style={{ fontWeight: 'bold', fontSize: '30px', marginBottom: '40px', marginTop: '40px' }}>Sign In</h3>
        <div style={{ marginBottom: '40px' }}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Type your username"
            style={{ ...inputStyle, border: `1px solid ${usernameError ? 'red' : '#ccc'}` }}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setUsernameError(''); 
            }}
          />
          {usernameError && <span style={{ color: 'red', fontSize: '12px' }}>{usernameError}</span>}
        </div>
        <div style={{ marginBottom: '40px', position: 'relative' }}>
      <label htmlFor="password">Password:</label>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          name="password"
          placeholder="Type your password"
          style={{ ...inputStyle, border: `1px solid ${passwordError ? 'red' : '#ccc'}` }}
          value={password}
          onChange={(e) => {
          setPassword(e.target.value);
          setPasswordError(''); 
        }}
        />
        {passwordError && <span style={{ color: 'red', fontSize: '12px', position: 'absolute', top: '100%', left: '0' }}>{passwordError}</span>}
        <div
          style={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
        }}
        onClick={handleShowPasswordToggle}
        >
        {showPassword ? '🙈' : '👁️'}
        </div>
      </div>
    </div>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            checked={rememberMe}
            onChange={handleRememberMeChange}
            style={{ marginRight: '10px', cursor: 'pointer' }}
          />
          <label htmlFor="rememberMe" style={{ cursor: 'pointer' }}>
            Remember Me
          </label>
        </div>
        <button style={buttonStyle} onClick={handleSignInClick}>
          Sign In
        </button>
        <a style={linkStyle} onClick={() => console.log('Forgot Username or Password clicked')}>
          Forgot Username or Password?
        </a>
        <Link href="/enrollment" passHref>
          <div className={`py-3 pl-2 pr-3 ${pathName === '/enrollment' ? styles.selected : ''}`}>
            Set Up Online Access
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AuthPage;