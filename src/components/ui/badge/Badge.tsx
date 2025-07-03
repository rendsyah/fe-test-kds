import type React from 'react';

type BadgeProps = {
  variant?: 'light' | 'solid';
  size?: 'sm' | 'md';
  color?: 'primary' | 'success' | 'error' | 'warning' | 'info';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children: React.ReactNode;
};

const Badge: React.FC<BadgeProps> = ({
  variant = 'light',
  color = 'primary',
  size = 'md',
  startIcon,
  endIcon,
  children,
}) => {
  const baseStyles = `inline-flex items-center px-2.5 py-1 justify-center gap-1 rounded-full font-medium`;

  const sizeStyles = {
    sm: 'text-xs',
    md: 'text-sm',
  };

  const variants = {
    light: {
      primary: 'bg-blue-500/15 text-blue-300',
      success: 'bg-green-500/15 text-green-500',
      error: 'bg-red-500/15 text-red-500',
      warning: 'bg-amber-500/15 text-amber-500',
      info: 'bg-sky-500/15 text-sky-500',
    },
    solid: {
      primary: 'bg-blue-500 text-white/90',
      success: 'bg-green-500 text-white/90',
      error: 'bg-red-500 text-white/90',
      warning: 'bg-amber-500 text-white/90',
      info: 'bg-sky-500 text-white/90',
    },
  };

  const sizeClasses = sizeStyles[size];
  const colorClasses = variants[variant][color];

  return (
    <span className={`${baseStyles} ${sizeClasses} ${colorClasses}`}>
      {startIcon && <span className="mr-1">{startIcon}</span>}
      {children}
      {endIcon && <span className="ml-1">{endIcon}</span>}
    </span>
  );
};

export default Badge;
