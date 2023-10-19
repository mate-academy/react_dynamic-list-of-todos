import React, { useReducer } from 'react';
import { Todo } from '../types/Todo';

type Action
  = { type: 'set', payload: { todo: Todo } }
  | { type: 'remove', payload: null };

interface SelectedTodoState {
  selectedTodo: Todo | null,
}

interface Props {
  children: React.ReactNode,
}

const reducer = (
  { selectedTodo }: SelectedTodoState,
  { type, payload }: Action,
): SelectedTodoState => {
  switch (type) {
    case 'set':
      return {
        selectedTodo: payload.todo,
      };
    case 'remove':
      return {
        selectedTodo: null,
      };
    default:
      return { selectedTodo };
  }
};

export const DispatchContext
  = React.createContext((_action: Action) => {}); // eslint-disable-line
export const StateContext
  = React.createContext({ selectedTodo: null } as SelectedTodoState);

export const SelectedTodoProvider: React.FC<Props> = ({ children }) => {
  const [
    selectedTodoState,
    dispatch,
  ] = useReducer(
    reducer,
    { selectedTodo: null },
  );

  return (
    <StateContext.Provider value={selectedTodoState}>
      <DispatchContext.Provider value={dispatch}>
        { children }
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};
