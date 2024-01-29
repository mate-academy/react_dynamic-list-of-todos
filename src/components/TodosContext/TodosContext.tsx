import React, { ChangeEvent, useState } from 'react';

type TodosContextProps = {
  showModal: boolean,
  currentUser: number,
  currentTodo: number,
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
  currentUser: 0,
  currentTodo: 0,
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
  const [currentUserId, setCurrentUserId] = useState(0);
  const [currentTodo, setCurrentTodo] = useState(0);
  const [selectValue, setSelectValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const handleShowModal = () => {
    setShowModal(!showModal);
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
    currentUser: currentUserId,
    currentTodo,
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
