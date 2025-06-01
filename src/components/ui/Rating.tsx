import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
}

const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  size = 'md',
  showValue = false,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const roundedValue = Math.round(value * 10) / 10;

  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex">
        {Array.from({ length: max }).map((_, index) => (
          <Star
            key={index}
            className={`${sizeClasses[size]} ${
              index < Math.floor(value)
                ? 'text-yellow-400 fill-yellow-400'
                : index < Math.ceil(value) && index >= Math.floor(value)
                ? 'text-yellow-400 fill-yellow-400 opacity-50'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      {showValue && (
        <span className="ml-1 text-sm text-gray-600">{roundedValue}</span>
      )}
    </div>
  );
};

export default Rating;