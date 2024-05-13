/* eslint-disable max-len */
import React from 'react';
import { ModalContexProvider } from './contexts/ModalContext';
import { TodoApp } from './TodoApp';

export const App: React.FC = () => {
  return (
    <>
      <ModalContexProvider>
        <TodoApp />
      </ModalContexProvider>
    </>
  );
};
