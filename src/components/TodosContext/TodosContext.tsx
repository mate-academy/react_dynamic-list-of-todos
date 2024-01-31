import React, { ChangeEvent, useState } from 'react';

type TodosContextProps = {
  showModal: boolean,
  currentUserId: number | null,
  currentTodoId: number | null,
  selectValue: string,
  searchValue: string,
  handleShowModal: () => void,
  handleChangeUser: (id: number) => void,
  handleCurrentTodo: (id: number) => void,
  handleSelectValue: (value: string) => void,
  handleChangeSearch: (value: ChangeEvent<HTMLInputElement>) => void,
  clearSearchValue: () => void,
};

export const TodosContext = React.createContext<TodosContextProps>({
  showModal: false,
  currentUserId: null,
  currentTodoId: null,
  selectValue: '',
  searchValue: '',
  handleShowModal: () => { },
  handleChangeUser: () => { },
  handleCurrentTodo: () => { },
  handleSelectValue: () => { },
  handleChangeSearch: () => { },
  clearSearchValue: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [currentTodoId, setCurrentTodo] = useState<number | null>(null);
  const [selectValue, setSelectValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const handleShowModal = () => {
    setShowModal(!showModal);
    if (showModal) {
      setCurrentTodo(null);
    }
  };

  const handleChangeUser = (userId:number) => {
    setCurrentUserId(userId);
  };

  const handleCurrentTodo = (id: number) => {
    setCurrentTodo(id);
  };

  const handleSelectValue = (value: string) => {
    setSelectValue(value);
  };

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const clearSearchValue = () => {
    setSearchValue('');
  };

  const value = {
    showModal,
    currentUserId,
    currentTodoId,
    selectValue,
    searchValue,
    handleShowModal,
    handleChangeUser,
    handleCurrentTodo,
    handleSelectValue,
    handleChangeSearch,
    clearSearchValue,
  };

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
