// src/shared/ModeSwitch.jsx
import { useState, useEffect } from 'react';
import { getMode, toggleMode } from '../utils/mode';
import { useNavigate } from 'react-router-dom';

export default function ModeSwitch({ children }) {
  const [mode, setModeState] = useState(getMode());
  const navigate = useNavigate();

  useEffect(() => {
    const onStorage = () => setModeState(getMode());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const handleClick = () => {
    const newMode = toggleMode();
    setModeState(newMode);
    if (newMode === 'Selling') {
      navigate('/freelancer');
    } else {
      navigate('/client');
    }
  };

  return (
    <div onClick={handleClick}>
      {typeof children === 'function' ? children(mode) : children}
    </div>
  );
}
