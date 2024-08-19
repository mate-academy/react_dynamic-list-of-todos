import React, { SetStateAction, useEffect, useMemo, useReducer, useState } from "react";
import { Todo } from "./types/Todo";
import { User } from "./types/User";

const dataFromStor = localStorage.getItem('todos');
const initialTodos: Todo[] = dataFromStor ? JSON.parse(dataFromStor) : [];

type Action = {
  type: string,
  payload?: string
}

interface FilteredTodosContextProps {
  filteredTodos: Todo[];
  dispatch: React.Dispatch<Action>;
}

export const FilteredTodosContext = React.createContext<FilteredTodosContextProps>({
  filteredTodos: initialTodos,
  dispatch: () => { },
});

interface FirtsLoadedContextProps {
  firtsLoadedPage: boolean;
  setFirtsLoadedPage: React.Dispatch<SetStateAction<boolean>>;
}

export const FirtsLoadedContext = React.createContext<FirtsLoadedContextProps>({
  firtsLoadedPage: true,
  setFirtsLoadedPage: () => { },
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

export const todoReducer = (
  state: Todo[],
  action: Action,
) => {

  switch (action.type) {
    case 'ALL':
      return initialTodos;
    case 'COMPLETED':
      return initialTodos.filter(todo => todo.completed);
    case 'ACTIVE':
      return initialTodos.filter(todo => !todo.completed);
    case 'SEARCH':
      return state.filter(todo => action.payload && todo.title.includes(action.payload));
    default:
      return initialTodos;
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

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [filteredTodos, dispatch] = useReducer(todoReducer, initialTodos);
  const [user, setUser] = useState<User | null>(null);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [firtsLoadedPage, setFirtsLoadedPage] = useState<boolean>(true);

  useEffect(() => {
    dispatch({ type: 'ALL' });
  }, []);

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
  const valueForFirstLoaded = useMemo(
    () => ({
      firtsLoadedPage,
      setFirtsLoadedPage,
    }),
    [firtsLoadedPage],
  );


  return (
    <FilteredTodosContext.Provider value={valueOfFilteredTodos}>
      <GetUserContext.Provider value={valueForUser}>
        <GetTodoContext.Provider value={valueForTodo}>
          <TodosContext.Provider value={valueForTodos}>
            <FirtsLoadedContext.Provider value={valueForFirstLoaded}>
              {children}
            </FirtsLoadedContext.Provider>
          </TodosContext.Provider>
        </GetTodoContext.Provider>
      </GetUserContext.Provider>
    </FilteredTodosContext.Provider>
  );
};
