import React, {
  ReactNode, createContext, useContext, useState, useEffect,
} from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getTodos, getUser } from '../../api';

interface TodosContextType {
  loading: boolean;
  loadingModal: boolean;
  modal: boolean;
  todosWithUser: TodoWithUser[];
  searchText: string;
  filter: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  setAppliedSearchText: React.Dispatch<React.SetStateAction<string>>;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

export interface TodoWithUser {
  user: User;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

const TodosContext = createContext<TodosContextType | undefined>(undefined);

export const TodosProvider: React
  .FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [loadingModal, setLoadingModal] = useState<boolean>(true);
  const [modal, setModal] = useState<boolean>(false);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosWithUser, setTodosWithUser] = useState<TodoWithUser[]>([]);

  const [searchText, setSearchText] = useState('');
  const [appliedSearchText, setAppliedSearchText] = useState('');

  const [filter, setFilter] = useState('all');

  function getPreparedTodos(currTodos: TodoWithUser[], query: string) {
    let preparedTodos = [...currTodos];
    const normalizeQuery = query.toLowerCase().trim();

    if (query) {
      preparedTodos = preparedTodos
        .filter(todo => todo.title.toLowerCase().includes(normalizeQuery)
          || todo.title.toLowerCase().includes(normalizeQuery));
    }

    return preparedTodos;
  }

  useEffect(() => {
    getTodos().then((todosFromServer: Todo[]) => {
      setTodos(todosFromServer);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      const userPromises = todos.map((todo) => getUser(todo.userId));
      const users = await Promise.all(userPromises);

      const newTodosWithUsers = todos.map((todo, index) => ({
        ...todo,
        user: users[index],
      }));

      setTodosWithUser(getPreparedTodos(newTodosWithUsers, appliedSearchText));

      setLoading(false);
    };

    if (todos.length > 0) {
      fetchUsers();
    }
  }, [todos, appliedSearchText]);

  return (
    <TodosContext.Provider value={{
      loading,
      setLoading,
      modal,
      setModal,
      todosWithUser,
      setSearchText,
      searchText,
      filter,
      setFilter,
      setAppliedSearchText,
      loadingModal,
      setLoadingModal,
    }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = (): TodosContextType => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error('useTodos must be used within a TodosProvider');
  }

  return context;
};
