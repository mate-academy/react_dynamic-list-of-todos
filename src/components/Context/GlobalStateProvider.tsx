import { createContext, useEffect, useReducer } from 'react';
import { Todo } from '../../types/Todo';
import { getTodos } from '../../api';
import { States } from '../../types/States';
import { User } from '../../types/User';

const initialStates: States = {
  todos: [],
  query: '',
  isLoading: false,
  isModalOpened: false,
  errorMessage: '',
  updateAt: new Date(),
  selectedTodoId: 0,
  selectedTodoUser: undefined,
  filteredTodos: [],
};

type Action =
  | { type: 'loadTodos'; payload: Todo[] }
  | { type: 'showError'; payload: string }
  | { type: 'updateRender' }
  | { type: 'startLoading' }
  | { type: 'stopLoading' }
  | { type: 'openModal' }
  | { type: 'closeModal' }
  | { type: 'pickTodoId'; payload: number | null }
  | { type: 'pickTodoUser'; payload: User | undefined }
  | { type: 'setQuery'; payload: string }
  | { type: 'filterTodos'; payload: Todo[] };

function statesReducer(states: States, action: Action) {
  switch (action.type) {
    case 'loadTodos':
      return { ...states, todos: action.payload };
    case 'startLoading':
      return { ...states, isLoading: true };
    case 'stopLoading':
      return { ...states, isLoading: false };
    case 'openModal':
      return { ...states, isModalOpened: true };
    case 'closeModal':
      return { ...states, isModalOpened: false };
    case 'showError':
      return { ...states, errorMessage: action.payload };
    case 'updateRender':
      return { ...states, updateAt: new Date() };
    case 'pickTodoId':
      return { ...states, selectedTodoId: action.payload };
    case 'pickTodoUser':
      return { ...states, selectedTodoUser: action.payload };
    case 'setQuery':
      return { ...states, query: action.payload };
    case 'filterTodos':
      return { ...states, fiteredTodos: action.payload };
  }
}

type DispatchContextType = {
  (action: Action): void;
};

export const StatesContext = createContext<States>(initialStates);
export const DispatchContext = createContext<DispatchContextType>(() => {});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [states, dispatch] = useReducer(statesReducer, initialStates);

  // eslint-disable-next-line no-console
  console.log(states);

  useEffect(() => {
    dispatch({ type: 'startLoading' });
    getTodos()
      .then(todosFromServer => {
        dispatch({
          type: 'loadTodos',
          payload: todosFromServer,
        });
      })
      .catch(() => dispatch({ type: 'showError', payload: 'Try again later' }))
      .finally(() => dispatch({ type: 'stopLoading' }));
  }, [states.updateAt]);

  return (
    <StatesContext.Provider value={states}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StatesContext.Provider>
  );
};
