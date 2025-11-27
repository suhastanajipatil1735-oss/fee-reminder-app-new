import React, { useEffect, useState } from 'react';
import { Wallet } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Start fade out halfway through
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1500);

    // Complete navigation after animation finishes
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 transition-opacity duration-1000 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="glass p-8 rounded-full mb-6 animate-bounce">
        <Wallet size={64} className="text-white" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight animate-pulse">
        Fees Reminder
      </h1>
      <p className="text-blue-100 mt-4 text-lg">Manage students efficiently</p>
    </div>
  );
};

export default SplashScreen;