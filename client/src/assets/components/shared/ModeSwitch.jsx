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

    // Retrieve profile completion status from localStorage
    const profileCompleted = localStorage.getItem("freelancerProfileCompleted") === "true";

    if (newMode === 'Selling') {
      if (profileCompleted) {
        navigate('/freelancer/dashboard');
      } else {
        navigate('/freelancer/start_selling');
      }
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
