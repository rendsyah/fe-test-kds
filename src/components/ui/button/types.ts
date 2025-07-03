export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
};
