/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo>();
  const [filterString, setFilterString] = useState('');
  const [filterState, setFilterState] = useState('');

  useEffect(() => {
    let cancel = false;

    async function fetchTodos() {
      setLoading(true);
      const fetchedTodos = await getTodos();

      if (!cancel) {
        setTodos(fetchedTodos);
      }

      setLoading(false);
    }

    fetchTodos();

    return () => {
      cancel = true;
    };
  }, []);

  const filterStatePredicate = (todo: Todo) => {
    switch (filterState) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  };

  const filterTodos = (todoList: Todo[]) => todoList
    .filter(todo => todo.title.toLowerCase().includes(filterString.toLowerCase()))
    .filter(filterStatePredicate);

  const renderedTodos = useMemo(() => filterTodos(todos), [filterString, filterState, todos]);

  const handleModalClose = () => {
    setSelectedTodo(undefined);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onInputUpdate={setFilterString}
                onInputClear={() => setFilterString('')}
                onSelect={setFilterState}
                input={filterString}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={renderedTodos}
                  selectedTodo={selectedTodo}
                  onShowClick={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onModalClose={handleModalClose}
        />
      )}
    </>
  );
};
