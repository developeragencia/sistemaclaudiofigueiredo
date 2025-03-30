
import React, { useState } from 'react';

interface AnimatedIconProps {
  size?: number;
  className?: string;
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({ 
  size = 32,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isRotated, setIsRotated] = useState(false);
  
  // Toggle rotation on click
  const handleClick = () => {
    setIsRotated(!isRotated);
  };

  return (
    <div 
      className={`relative ${className} cursor-pointer`}
      style={{ width: size, height: size }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div 
        className={`absolute inset-0 transition-all duration-700 ease-in-out ${isHovered ? 'scale-110' : ''}`}
        style={{ 
          perspective: '1000px', 
          filter: isHovered ? 'drop-shadow(0 0 5px rgba(255,255,255,0.5))' : 'none' 
        }}
      >
        {/* Container that rotates */}
        <div 
          className="relative w-full h-full transition-transform duration-700 ease-in-out"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: isRotated ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          {/* Front - Normal logo */}
          <div className="absolute inset-0 backface-hidden">
            <svg viewBox="0 0 100 100" width={size} height={size}>
              <polygon 
                points="25,12.5 50,12.5 37.5,25 12.5,25" 
                fill="#222222" 
                className={`transition-all duration-300 ${isHovered ? 'opacity-90' : ''}`} 
              />
              <polygon 
                points="50,12.5 75,12.5 62.5,25 37.5,25" 
                fill="#FFFFFF" 
                stroke="#222222" 
                strokeWidth="1"
                className={`transition-all duration-300 ${isHovered ? 'opacity-90' : ''}`}
              />
              <polygon 
                points="75,12.5 100,12.5 87.5,25 62.5,25" 
                fill="#FFFFFF" 
                stroke="#222222" 
                strokeWidth="1"
                className={`transition-all duration-300 ${isHovered ? 'opacity-90' : ''}`}
              />
              
              <polygon 
                points="12.5,25 37.5,25 25,37.5 0,37.5" 
                fill="#222222"
                className={`transition-all duration-300 delay-100 ${isHovered ? 'opacity-90' : ''}`}
              />
              <polygon 
                points="37.5,25 62.5,25 50,37.5 25,37.5" 
                fill="#222222"
                className={`transition-all duration-300 delay-100 ${isHovered ? 'opacity-90' : ''}`}
              />
              <polygon 
                points="62.5,25 87.5,25 75,37.5 50,37.5" 
                fill="#FFFFFF"
                stroke="#222222" 
                strokeWidth="1"
                className={`transition-all duration-300 delay-100 ${isHovered ? 'opacity-90' : ''}`}
              />
              
              <polygon 
                points="0,37.5 25,37.5 12.5,50 -12.5,50" 
                fill="#222222"
                className={`transition-all duration-300 delay-200 ${isHovered ? 'opacity-90' : ''}`}
              />
              <polygon 
                points="25,37.5 50,37.5 37.5,50 12.5,50" 
                fill="#FFFFFF"
                stroke="#222222" 
                strokeWidth="1"
                className={`transition-all duration-300 delay-200 ${isHovered ? 'opacity-90' : ''}`}
              />
              <polygon 
                points="50,37.5 75,37.5 62.5,50 37.5,50" 
                fill="#FFFFFF"
                stroke="#222222" 
                strokeWidth="1"
                className={`transition-all duration-300 delay-200 ${isHovered ? 'opacity-90' : ''}`}
              />
            </svg>
          </div>
          
          {/* Back - Inverted logo */}
          <div 
            className="absolute inset-0 backface-hidden"
            style={{ transform: 'rotateY(180deg)' }}
          >
            <svg viewBox="0 0 100 100" width={size} height={size}>
              <polygon 
                points="75,12.5 50,12.5 62.5,25 87.5,25" 
                fill="#222222" 
                className="animate-pulse-slow"
              />
              <polygon 
                points="50,12.5 25,12.5 37.5,25 62.5,25" 
                fill="#FFFFFF" 
                stroke="#222222" 
                strokeWidth="1" 
                className="animate-pulse-slow delay-100"
              />
              <polygon 
                points="25,12.5 0,12.5 12.5,25 37.5,25" 
                fill="#FFFFFF" 
                stroke="#222222" 
                strokeWidth="1" 
                className="animate-pulse-slow delay-200"
              />
              
              <polygon 
                points="87.5,25 62.5,25 75,37.5 100,37.5" 
                fill="#222222" 
                className="animate-pulse-slow delay-300"
              />
              <polygon 
                points="62.5,25 37.5,25 50,37.5 75,37.5" 
                fill="#222222" 
                className="animate-pulse-slow delay-400"
              />
              <polygon 
                points="37.5,25 12.5,25 25,37.5 50,37.5" 
                fill="#FFFFFF" 
                stroke="#222222" 
                strokeWidth="1" 
                className="animate-pulse-slow delay-500"
              />
              
              <polygon 
                points="100,37.5 75,37.5 87.5,50 112.5,50" 
                fill="#222222" 
                className="animate-pulse-slow delay-600"
              />
              <polygon 
                points="75,37.5 50,37.5 62.5,50 87.5,50" 
                fill="#FFFFFF" 
                stroke="#222222" 
                strokeWidth="1" 
                className="animate-pulse-slow delay-700"
              />
              <polygon 
                points="50,37.5 25,37.5 37.5,50 62.5,50" 
                fill="#FFFFFF" 
                stroke="#222222" 
                strokeWidth="1" 
                className="animate-pulse-slow delay-800"
              />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Tooltip that appears on hover */}
      {isHovered && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-80 whitespace-nowrap">
          {isRotated ? 'Voltar' : 'Girar'}
        </div>
      )}
    </div>
  );
};

export default AnimatedIcon;
