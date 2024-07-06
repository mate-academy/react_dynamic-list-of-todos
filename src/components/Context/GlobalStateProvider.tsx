import { createContext, useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { getTodos } from '../../api';
import { States } from '../../types/States';

const initialTodos: Todo[] = [];
const initialStates: States = {
  isLoading: false,
  errorMessage: '',
  updateAt: new Date(),
};

function statesReducer(states: States, action: Action) {
  const Handlers = () =>  
}

export const TodosContext = createContext(initialTodos);
export const StatesContext = createContext(initialStates);

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState(initialTodos);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  return (
    <TodosContext.Provider value={todos}>{children}</TodosContext.Provider>
  );
};
