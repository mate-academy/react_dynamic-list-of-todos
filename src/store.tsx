import React, {
  SetStateAction,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { Todo } from './types/Todo';
import { User } from './types/User';

type Action = {
  type: string;
  allTodos?: Todo[] | null;
  payload?: string;
};

interface FilteredTodosContextProps {
  filteredTodos: Todo[] | null;
  dispatch: React.Dispatch<Action>;
}

export const FilteredTodosContext =
  React.createContext<FilteredTodosContextProps>({
    filteredTodos: [],
    dispatch: () => { },
  });

interface TodosContextProps {
  todos: Todo[] | null;
  setTodos: React.Dispatch<SetStateAction<Todo[] | null>>;
}

export const TodosContext = React.createContext<TodosContextProps>({
  todos: null,
  setTodos: () => { },
});

interface TodoContextProps {
  todo: Todo | null;
  setTodo: React.Dispatch<SetStateAction<Todo | null>>;
}

export const GetTodoContext = React.createContext<TodoContextProps>({
  todo: null,
  setTodo: () => { },
});

export const todoReducer = (state: Todo[] | null, action: Action) => {
  const initialTodos = action.allTodos ? action.allTodos : [];

  switch (action.type) {
    case 'ALL':
      return initialTodos;
    case 'COMPLETED':
      return initialTodos.filter(todo => todo.completed);
    case 'ACTIVE':
      return initialTodos.filter(todo => !todo.completed);
    case 'SEARCH':
      return state && state.filter(
        todo => action.payload && todo.title.toLowerCase().includes(action.payload.toLowerCase()),
      );
    default:
      return state;
  }
};

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const GetUserContext = React.createContext<UserContextProps>({
  user: null,
  setUser: () => { },
});

interface TitileContextProps {
  title: string;
  setTitle: React.Dispatch<SetStateAction<string>>;
}

export const TitileContext = React.createContext<TitileContextProps>({
  title: '',
  setTitle: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [filteredTodos, dispatch] = useReducer(todoReducer, []);
  const [user, setUser] = useState<User | null>(null);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    dispatch({ type: 'ALL', allTodos: todos });
  }, [todos]);

  const valueOfFilteredTodos = useMemo(
    () => ({
      filteredTodos,
      dispatch,
    }),
    [filteredTodos],
  );
  const valueForUser = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user],
  );
  const valueForTodo = useMemo(
    () => ({
      todo,
      setTodo,
    }),
    [todo],
  );
  const valueForTodos = useMemo(
    () => ({
      todos,
      setTodos,
    }),
    [todos],
  );
  const valueForTitle = useMemo(
    () => ({
      title,
      setTitle,
    }),
    [title]
  );

  return (
    <FilteredTodosContext.Provider value={valueOfFilteredTodos}>
      <GetUserContext.Provider value={valueForUser}>
        <GetTodoContext.Provider value={valueForTodo}>
          <TodosContext.Provider value={valueForTodos}>
            <TitileContext.Provider value={valueForTitle}>
              {children}
            </TitileContext.Provider>
          </TodosContext.Provider>
        </GetTodoContext.Provider>
      </GetUserContext.Provider>
    </FilteredTodosContext.Provider>
  );
};
