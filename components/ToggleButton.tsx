// components/ToggleButton.tsx
import React from 'react';
import Image from 'next/image';
import sun from '../public/assets/sun.webp';
import moon from '../public/assets/moon.png';
import { useTheme } from '@/utils/theme-context';


interface ToggleButtonProps {
  className?: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      onClick={toggleTheme}
      className={`${className} relative w-16 h-8 flex items-center rounded-2xl cursor-pointer transition-colors duration-300 ${
        theme !== 'dark' ? 'bg-gray-300' : 'bg-gray-800'
      }`}
    >
      <div
        className={`absolute top-0 w-8 h-8 rounded-2xl flex justify-center items-center transition-transform duration-300 ${
          theme === 'dark' ? 'translate-x-8' : 'translate-x-0'
        }`}
      >
        {theme !== 'dark' ? (
          <Image src={sun} alt="Sun" width={30} height={24} />
        ) : (
          <Image src={moon} alt="Moon" width={24} height={24} />
        )}
      </div>
    </div>
  );
};

export default ToggleButton;
