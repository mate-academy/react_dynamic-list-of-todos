/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';

const TodoContext = createContext({
  todos: [] as Todo[],
  setTodos: (_newTodos: Todo[]) => { },
  isListLoading: true,
  setIsListLoading: (_newState: boolean) => { },
  isModalLoading: false,
  setIsModalLoading: (_newState: boolean) => { },
  isVisible: false,
  setIsVisible: (_newState: boolean) => { },
  query: '',
  setQuery: (_newQuery: string) => { },
  filterField: '',
  setFilterField: (_newFilterField: string) => { },
  todosForRender: [] as Todo[],
  selectedUser: 0,
  setSelectedUser: (_newUser: number) => { },
  oppenModalWindow: (_todo: Todo) => { },
  user: {} as User,
  setUser: (_newUser: User) => { },
  selectedTodoId: 0,
  setSelectedTodoId: (_newTodoId: number) => { },
  selectedTodo: {} as Todo,
  closeModalWindow: () => { },
});

type Params = {
  filterField: string,
  query: string,
};

function getFiltered(todos: Todo[], { filterField, query }: Params) {
  const filteredTodos = todos.filter(todo => {
    switch (filterField) {
      case 'all':
        return todo;
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const normalizedQuery = query.toLowerCase().trim();

  return filteredTodos.filter(todo => {
    const normalizedTitle = todo.title.toLowerCase();

    return normalizedTitle.includes(normalizedQuery);
  });
}

type Props = {
  children: React.ReactNode,
};

const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [isListLoading, setIsListLoading] = useState(true);
  const [isModalLoading, setIsModalLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [query, setQuery] = useState('');
  const [filterField, setFilterField] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [user, setUser] = useState<User>({} as User);
  const [selectedTodoId, setSelectedTodoId] = useState(0);

  const todosForRender = useMemo(() => {
    return getFiltered(todos, { filterField, query });
  }, [query, filterField, todos]);

  const selectedTodo = useMemo(() => {
    return todos.find(todo => todo.id === selectedTodoId) || {} as Todo;
  }, [selectedTodoId]);

  useEffect(() => {
    getTodos().then(setTodos).finally(() => setIsListLoading(false));
  }, []);

  useEffect(() => {
    if (selectedUser) {
      getUser(selectedUser).then(setUser).finally(() => setIsModalLoading(false));
    }
  }, [selectedUser]);

  const oppenModalWindow = (todo: Todo) => {
    setIsModalLoading(true);
    setIsVisible(true);
    setSelectedUser(todo.userId);
    setSelectedTodoId(todo.id);
  };

  const closeModalWindow = () => {
    setIsVisible(false);
    setSelectedUser(0);
  };

  const value = useMemo(() => ({
    todos,
    setTodos,
    isListLoading,
    setIsListLoading,
    isModalLoading,
    setIsModalLoading,
    isVisible,
    setIsVisible,
    query,
    setQuery,
    filterField,
    setFilterField,
    todosForRender,
    selectedUser,
    setSelectedUser,
    oppenModalWindow,
    user,
    setUser,
    selectedTodoId,
    setSelectedTodoId,
    selectedTodo,
    closeModalWindow,
  }), [todos, isListLoading, query, filterField, isVisible, isModalLoading, selectedUser]);

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoProvider };
