/* eslint-disable @typescript-eslint/indent */
/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from '../../types/Todo';
import { getTodos } from '../../api';
import { Dispatch, SetStateAction } from 'react';
import { User } from '../../types/User';

export enum FilterSettings {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

type Props = {
  children: React.ReactNode;
};

const emptyUser = {
  id: 0,
  name: '0',
  email: '0',
  phone: '0',
};

const emptyTodo = {
  id: 0,
  title: '',
  completed: false,
  userId: 0,
};

type TodoContextType = {
  todosList: Todo[];
  setTodosList: (v: Todo[]) => void;
  filterSettings: string;
  setFilterSettings: (v: string) => void;
  preparedList: Todo[];
  setPreparedList: Dispatch<SetStateAction<Todo[]>>;
  query: string;
  setQuery: (v: string) => void;
  loader: boolean;
  setLoader: Dispatch<SetStateAction<boolean>>;
  showUserDetails: boolean;
  setShowUserDetails: Dispatch<SetStateAction<boolean>>;
  selectedUser: User;
  setSelectedUser: Dispatch<
    SetStateAction<{ id: number; name: string; email: string; phone: string }>
  >;
  selectedTodo: Todo;
  setSelectedTodo: Dispatch<SetStateAction<Todo>>;
};

export const TodoContext = React.createContext<TodoContextType>({
  todosList: [],
  setTodosList: () => {},
  filterSettings: FilterSettings.all,
  setFilterSettings: () => {},
  preparedList: [],
  setPreparedList: () => {},
  query: '',
  setQuery: () => {},
  loader: true,
  setLoader: () => {},
  showUserDetails: false,
  setShowUserDetails: () => {},
  selectedUser: emptyUser,
  setSelectedUser: () => {},
  selectedTodo: emptyTodo,
  setSelectedTodo: () => {},
});

function prepareList(list: Todo[], settings: string, query?: string) {
  let readyList = [...list];

  switch (settings) {
    case 'active':
      readyList = readyList.filter(item => item.completed === false);
      break;
    case 'completed':
      readyList = readyList.filter(item => item.completed === true);
      break;
    default:
      break;
  }

  if (query) {
    readyList = readyList.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase().trim()),
    );
  }

  return readyList;
}

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [firstRender, setFirstRender] = useState(true);

  const [loader, setLoader] = useState(true);

  const [todosList, setTodosList] = useState<Todo[]>([]);

  const [filterSettings, setFilterSettings] = useState('all');

  const [query, setQuery] = useState('');

  const [preparedList, setPreparedList] = useState(todosList);

  const [showUserDetails, setShowUserDetails] = useState(false);

  const [selectedTodo, setSelectedTodo] = useState(emptyTodo);

  const [selectedUser, setSelectedUser] = useState(emptyUser);

  const initialTodosList = () => {
    getTodos()
      .then(todos => setTodosList(todos))
      .finally(() => setLoader(false));
  };

  useEffect(() => {
    if (firstRender) {
      initialTodosList();

      setFirstRender(false);
    } else {
      setPreparedList(prepareList(todosList, filterSettings, query));
    }
  }, [filterSettings, firstRender, query, todosList]);

  const value = useMemo<TodoContextType>(
    () => ({
      todosList,
      setTodosList,
      filterSettings,
      setFilterSettings,
      preparedList,
      setPreparedList,
      query,
      setQuery,
      loader,
      setLoader,
      showUserDetails,
      setShowUserDetails,
      selectedUser,
      setSelectedUser,
      selectedTodo,
      setSelectedTodo,
    }),
    [
      todosList,
      filterSettings,
      preparedList,
      query,
      loader,
      showUserDetails,
      selectedUser,
      selectedTodo,
    ],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
