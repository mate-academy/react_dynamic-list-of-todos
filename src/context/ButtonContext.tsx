import React, { useMemo, useState } from 'react';

export const ButtonContext = React.createContext({
  isPressed: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setIsPressed: (_isPressed: boolean) => {},
});

type Props = {
  children: React.ReactNode;
};

export const ButtonContextProvider: React.FC<Props> = ({ children }) => {
  const [isPressed, setIsPressed] = useState(false);

  const value = useMemo(
    () => ({
      isPressed,
      setIsPressed,
    }),
    [isPressed],
  );

  return (
    <ButtonContext.Provider value={value}>{children}</ButtonContext.Provider>
  );
};
