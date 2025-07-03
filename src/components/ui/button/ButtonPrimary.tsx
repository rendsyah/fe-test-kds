import type React from 'react';
import type { ButtonProps } from './types';
import { Button as HeadlessButton } from '@headlessui/react';
import { cn } from '@/libs/utils/cn.utils';
import LoadingIcon from '@/components/icons/Loading';

const ButtonPrimary: React.FC<ButtonProps> = ({
  children,
  type,
  className,
  fullWidth = true,
  isLoading = false,
  icon,
  disabled,
  ...restProps
}) => {
  const baseClasses = cn(
    `text-white/90 bg-primary hover:bg-primary/80`,
    fullWidth && 'w-full',
    className,
  );

  const isDisabled = disabled || isLoading;

  return (
    <HeadlessButton
      type={type}
      disabled={isDisabled}
      className={`
        flex items-center justify-center gap-3 text-sm font-semibold py-3 px-4 rounded-lg transition-colors ${baseClasses}`}
      {...restProps}
    >
      {isLoading ? (
        <LoadingIcon className="w-5 h-5 text-white/90" />
      ) : (
        <>
          {icon && <span>{icon}</span>}
          {children}
        </>
      )}
    </HeadlessButton>
  );
};

export default ButtonPrimary;
