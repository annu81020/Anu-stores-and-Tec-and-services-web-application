import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, changeTheme } = useTheme();

  const toggleTheme = () => {
    changeTheme(theme === 'default' ? 'midnight' : 'default');
  };

  return (
    <button 
      className="theme-toggle-btn" 
      onClick={toggleTheme}
      title={theme === 'default' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      aria-label="Toggle theme"
    >
      {theme === 'default' ? <FaMoon /> : <FaSun />}
    </button>
  );
};

export default ThemeToggle;
