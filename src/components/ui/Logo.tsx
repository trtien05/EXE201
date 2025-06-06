import React from 'react';
import logo from '../../images/logo.png';
interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  width = 40, 
  height = 40, 
  showText = true 
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src={logo}
        alt="Sencare Logo" 
        width={width}
        height={height}
        className="mr-2"
      />
      {showText && (
        <span className="text-[#0077B6] font-bold text-xl sm:text-2xl">Sencare</span>
      )}
    </div>
  );
};

export default Logo;
