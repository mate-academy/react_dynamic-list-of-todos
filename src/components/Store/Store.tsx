import React, { useReducer } from 'react';
import { Todo } from '../../types/Todo';

interface State {
  selectedTodo: Todo | null,
}

type Action = {
  type: 'selectNew', todo: Todo,
} | {
  type: 'cancelSelection',
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'selectNew':
      return { selectedTodo: action.todo };

    case 'cancelSelection':
      return { selectedTodo: null };

    default: return state;
  }
}

const initialState: State = {
  selectedTodo: null,
};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => { },
);

interface Props {
  children: React.ReactNode,
}

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  // const storedTodo = localStorage.getItem('selectedTodo');
  // const initialTodos = (storedTodo && (storedTodo !== null)) ? {
  //   selectedTodo: JSON.parse(storedTodo),
  // } : initialState;

  const [state, dispatch] = useReducer(reducer, initialState);

  // useEffect(() => {
  //   if (state.selectedTodo) {
  //     localStorage.setItem('selectedTodo', JSON.stringify(state.selectedTodo));
  //   }
  // }, [state.selectedTodo]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
