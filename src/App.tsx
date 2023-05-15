/* eslint-disable max-len */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Filter } from './types/FilterTodo';

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState(Filter.All);

  const loadTodos = useCallback(async () => {
    const todos = await getTodos();

    setVisibleTodos(todos);
  }, []);

  const handleChange = useCallback((string: string) => {
    setQuery(string);
  }, []);

  const handleSelectOption = useCallback((option: Filter) => {
    setSelectedOption(option);
  }, []);

  const filteredTodos = useMemo(() => {
    let filterTodos = visibleTodos;

    if (selectedOption) {
      switch (selectedOption) {
        case Filter.ACTIVE:
          filterTodos = visibleTodos.filter(({ completed }) => !completed);
          break;
        case Filter.COMPLETED:
          filterTodos = visibleTodos.filter(({ completed }) => completed);
          break;
        default:
          filterTodos = visibleTodos;
      }
    }

    return filterTodos.filter(({ title }) => title.toLowerCase().includes(query.toLowerCase()));
  }, [selectedOption, visibleTodos, query]);

  const handleSelect = (todo: Todo) => {
    setCurrentTodo(todo);
  };

  const handleClose = () => {
    setCurrentTodo(null);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onChange={handleChange}
                selectedOption={selectedOption}
                onSelectOption={handleSelectOption}
              />
            </div>

            <div className="block">
              {(!filteredTodos.length && !query)
                ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodos}
                    currentTodo={currentTodo}
                    onSelect={handleSelect}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal todo={currentTodo} onClose={handleClose} />}
    </>
  );
};
