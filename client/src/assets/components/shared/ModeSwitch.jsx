import React, { useState, useEffect } from 'react';
import { getMode, toggleMode } from '../utils/mode';
import { useNavigate } from 'react-router-dom';

export default function ModeSwitch() {
  const [mode, setModeState] = useState(getMode());
  const navigate = useNavigate();

  useEffect(() => {
    // keep state in sync if another tab changes it
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
    <button
      onClick={handleClick}
    >
      Switch to {mode === 'Selling' ? 'Buying' : 'Selling'}
    </button>
  );
}
