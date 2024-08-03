import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import sun from '../public/assets/sun.webp';
import moon from '../public/assets/moon.png';
import { useTheme } from '@/utils/theme-context';

interface ToggleButtonProps {
  className?: string;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();
  const [isToggled, setIsToggled] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mode = localStorage.getItem('theme');
      setIsToggled(mode === 'dark');
    }
  }, []);

  useEffect(() => {
    setIsToggled(theme === 'dark');
  }, [theme]);

  const handleToggle = () => {
    toggleTheme();
    setIsToggled((prevState) => !prevState);
  };

  return (
    <div
      onClick={handleToggle}
      className={`${className} relative w-16 h-8  flex items-center rounded-2xl cursor-pointer transition-colors duration-300 ${
        isToggled ? 'bg-gray-800' : 'bg-gray-300'
      }`}
    >
      <div
        className={`absolute top-0 w-8 h-8 rounded-2xl flex justify-center items-center transition-transform duration-300 ${
          isToggled ? 'translate-x-8' : 'translate-x-0'
        }`}
      >
        {!isToggled ? (
          <Image src={sun} alt="Sun" width={30} height={24} />
        ) : (
          <Image src={moon} alt="Moon" width={24} height={24} />
        )}
      </div>
    </div>
  );
};

