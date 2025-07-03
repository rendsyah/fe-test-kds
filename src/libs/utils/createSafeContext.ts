import { createContext, useContext } from 'react';

export const createSafeContext = <T>(name: string) => {
  const context = createContext<T | undefined>(undefined);

  const useSafeContext = () => {
    const value = useContext(context);

    if (value === undefined) throw new Error(`use${name} must be used within a ${name}Provider`);

    return value;
  };

  return [context, useSafeContext] as const;
};
