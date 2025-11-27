import React, { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="animate-fade-in">
      <Dashboard />
    </div>
  );
};

export default App;