import React, { useMemo, useState } from 'react';

export const EyeClickContext = React.createContext({
  isClicked: false,
  setIsClicked: (isClicked: boolean) => {
    // eslint-disable-next-line no-console
    console.log(isClicked);
  },
});

type PropsEyeClick = {
  children: React.ReactNode;
};

export const EyeClickProvider: React.FC<PropsEyeClick> = ({ children }) => {
  const [isClicked, setIsClicked] = useState(false);
  const value = useMemo(
    () => ({
      isClicked,
      setIsClicked,
    }),
    [isClicked],
  );

  return (
    <EyeClickContext.Provider value={value}>
      {children}
    </EyeClickContext.Provider>
  );
};

export const ShowModalContext = React.createContext({
  isModalShowed: false,
  setisModalShowed: (isModalShowed: boolean) => {
    // eslint-disable-next-line no-console
    console.log(isModalShowed);
  },
});

type PropsShowModal = {
  children: React.ReactNode;
};

export const ShowModalProvider: React.FC<PropsShowModal> = ({ children }) => {
  const [isModalShowed, setisModalShowed] = useState(false);
  const value = useMemo(
    () => ({
      isModalShowed,
      setisModalShowed,
    }),
    [isModalShowed],
  );

  return (
    <ShowModalContext.Provider value={value}>
      {children}
    </ShowModalContext.Provider>
  );
};

export const ModalIdContext = React.createContext({
  currentId: 0,
  setCurrentId: (currentId: number) => {
    // eslint-disable-next-line no-console
    console.log(currentId);
  },
});

type PropsModalId = {
  children: React.ReactNode;
};

export const ModalIdProvider: React.FC<PropsModalId> = ({ children }) => {
  const [currentId, setCurrentId] = useState(0);
  const value = useMemo(
    () => ({
      currentId,
      setCurrentId,
    }),
    [currentId],
  );

  return (
    <ModalIdContext.Provider value={value}>{children}</ModalIdContext.Provider>
  );
};
