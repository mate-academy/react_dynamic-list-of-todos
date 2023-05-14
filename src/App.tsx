/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
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

  const loadTodos = async () => {
    const todos = await getTodos();

    setVisibleTodos(todos);
  };

  const changeInput = useCallback((string: string) => {
    setQuery(string);
  }, []);

  const changeOption = useCallback((option: Filter) => {
    setSelectedOption(option);
  }, []);

  const filterTodos = useCallback((string: string, filter: Filter, todos: Todo[]) => {
    let preparedTodos = todos;

    switch (filter) {
      case Filter.ACTIVE:
        preparedTodos = todos.filter(({ completed }) => !completed);
        break;
      case Filter.COMPLETED:
        preparedTodos = todos.filter(({ completed }) => completed);
        break;
      default:
        preparedTodos = todos;
    }

    return preparedTodos.filter(({ title }) => (
      title.toLowerCase().includes(string.toLowerCase())
    ));
  }, []);

  const handleSelect = (todo: Todo) => {
    setCurrentTodo(todo);
  };

  const handleClose = () => {
    setCurrentTodo(null);
  };

  const filteredTodos = filterTodos(query, selectedOption, visibleTodos);

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
                changeInput={changeInput}
                selectedOption={selectedOption}
                changeOption={changeOption}
              />
            </div>

            <div className="block">
              {(!filteredTodos.length && !query)
                ? (<Loader />)
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
