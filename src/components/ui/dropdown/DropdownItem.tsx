import type React from 'react';
import Link from 'next/link';

type DropdownItemProps = {
  tag?: 'a' | 'button';
  href?: string;
  baseClassName?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  onItemClick?: () => void;
};

const DropdownItem: React.FC<DropdownItemProps> = ({
  tag = 'button',
  href,
  onClick,
  onItemClick,
  baseClassName = 'block w-full text-left px-3 py-2.5 text-sm rounded-lg hover:text-primary',
  className,
  children,
}) => {
  const combinedClasses = `${baseClassName} ${className}`.trim();

  const handleClick = (event: React.MouseEvent) => {
    if (tag === 'button') event.preventDefault();
    if (onClick) onClick();
    if (onItemClick) onItemClick();
  };

  if (tag === 'a' && href) {
    return (
      <Link href={href} className={combinedClasses} onClick={handleClick}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={handleClick} className={combinedClasses}>
      {children}
    </button>
  );
};

export default DropdownItem;
