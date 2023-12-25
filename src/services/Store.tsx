import React, { useMemo, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Todo } from '../types/Todo';
import { ConditionFilter } from '../types/conditionFilter';

type TodosContextProps = {
  selectedTodoId: number,
  setSelectedTodoId: (selectedId: number) => void,
  todos: Todo[],
  setTodos: (newValue: Todo[]) => void,
  displayTodoModal: boolean,
  setDisplayTodoModal: (displayModal: boolean) => void,
  loading: boolean,
  setLoading: (loader: boolean) => void,
  titleFilter: string,
  setTitleFilter: (value: string) => void,
  conditionFilter: ConditionFilter
  setConditionFilter: (filter: ConditionFilter) => void,
  filteredTodos: Todo[];
};

export const TodosContext = React.createContext<TodosContextProps>({
  selectedTodoId: 0,
  setSelectedTodoId: () => {},
  todos: [],
  setTodos: () => [],
  displayTodoModal: false,
  setDisplayTodoModal: () => {},
  loading: false,
  setLoading: () => {},
  titleFilter: '',
  setTitleFilter: () => {},
  conditionFilter: ConditionFilter.All,
  setConditionFilter: () => {},
  filteredTodos: [],
});

type Props = {
  children: React.ReactNode,
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [displayTodoModal, setDisplayTodoModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [titleFilter, setTitleFilter] = useState('');
  const [conditionFilter, setConditionFilter] = useState(ConditionFilter.All);

  let filteredTodos = todos.filter(todo => todo.title
    .toLocaleLowerCase().includes(titleFilter));

  function finalFiltering() {
    let filtering = filteredTodos;

    switch (conditionFilter) {
      case ConditionFilter.Completed:
        filtering = filteredTodos.filter(todo => todo.completed);
        break;
      case ConditionFilter.Active:
        filtering = filteredTodos.filter(todo => !todo.completed);
        break;
      default:
        filtering = filteredTodos;
    }

    return filtering;
  }

  filteredTodos = finalFiltering();

  const value = useMemo(() => ({
    selectedTodoId,
    setSelectedTodoId,
    todos,
    setTodos,
    displayTodoModal,
    setDisplayTodoModal,
    loading,
    setLoading,
    titleFilter,
    setTitleFilter,
    conditionFilter,
    setConditionFilter,
    filteredTodos,

  }), [selectedTodoId,
    todos,
    displayTodoModal,
    loading,
    titleFilter,
    conditionFilter,
    filteredTodos,
    setTodos,
  ]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
