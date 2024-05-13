import React, { ReactNode, createContext, useState } from 'react';
import { User } from '../types/User';
import { getUser } from '../services/api';
import { Todo } from '../types/Todo';

interface ModalContextProviderType {
  setModalContext: (todo?: Todo | undefined) => void;
  userDataInModal: User;
  todoDataInModal: Todo;
  showModal: boolean;
  loadingModalState: boolean;
}

export const ModalContext = createContext<ModalContextProviderType | undefined>(
  undefined,
);

export const ModalContexProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userDataInModal, setUserDataInModal] = useState({} as User);
  const [todoDataInModal, setTodoDataInModal] = useState({} as Todo);
  const [showModal, setShowModal] = useState(false);
  const [loadingModalState, setLodiangModalState] = useState(true);

  const setModalContext = (todo?: Todo | undefined) => {
    if (todo === undefined) {
      setShowModal(false);
      setLodiangModalState(true);
      setTodoDataInModal({} as Todo);

      return;
    }

    setShowModal(true);
    setTodoDataInModal(todo);
    getUser(todo.userId)
      .then(userData => setUserDataInModal(userData))
      .then(() => setLodiangModalState(false));
  };

  return (
    <ModalContext.Provider
      value={{
        setModalContext: setModalContext,
        userDataInModal: userDataInModal,
        todoDataInModal: todoDataInModal,
        showModal: showModal,
        loadingModalState: loadingModalState,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
