import { createContext, useEffect, useReducer, useState } from 'react';
import { Todo } from '../../types/Todo';
import { getTodos } from '../../api';
import { States } from '../../types/States';

const initialTodos: Todo[] = [];
const initialStates: States = {
  isLoading: false,
  errorMessage: '',
  updateAt: new Date(),
  isModalOpen: false,
  selectedTodo: 0,
};

type Action =
  | { type: 'showError'; payload: string }
  | { type: 'loading' }
  | { type: 'stop-loading' }
  | { type: 'updateRender' }
  | { type: 'openModal' }
  | { type: 'closeModal' }
  | { type: 'selectTodo'; payload: number };

function statesReducer(states: States, action: Action) {
  switch (action.type) {
    case 'loading':
      return { ...states, isLoading: true };
    case 'stop-loading':
      return { ...states, isLoading: false };
    case 'showError':
      return { ...states, errorMessage: action.payload };
    case 'updateRender':
      return { ...states, updateAt: new Date() };
    case 'openModal':
      return { ...states, isModalOpen: true };
    case 'closeModal':
      return { ...states, isModalOpen: false };
    case 'selectTodo':
      return { ...states, selectedTodo: action.payload };
  }
}

type DispatchContextType = {
  (action: Action): void;
};

export const TodosContext = createContext<Todo[]>(initialTodos);
export const StatesContext = createContext<States>(initialStates);
export const DispatchContext = createContext<DispatchContextType>(() => {});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState(initialTodos);
  const [states, dispatch] = useReducer(statesReducer, initialStates);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => dispatch({ type: 'showError', payload: 'Try again later' }))
      .finally(() => dispatch({ type: 'stop-loading' }));
  }, [states.updateAt]);

  return (
    <StatesContext.Provider value={states}>
      <DispatchContext.Provider value={dispatch}>
        <TodosContext.Provider value={todos}>{children}</TodosContext.Provider>
      </DispatchContext.Provider>
    </StatesContext.Provider>
  );
};
