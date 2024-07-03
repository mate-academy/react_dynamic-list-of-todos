/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types';
import { getTodos } from './api';
import { FilterOptions } from './types';
import { getPrepearedTodos } from './helpers/getPrepearedTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [filterQuery, setFilterQuery] = useState('');
  const [filterSelect, setFilterSelect] = useState<FilterOptions>(
    FilterOptions.ALL,
  );

  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleTodoClick = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
  };

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(fetchedTodos => {
        setTodos(fetchedTodos);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setFilteredTodos(todos);
    if (filterSelect !== FilterOptions.ALL || filterQuery) {
      setFilteredTodos(getPrepearedTodos(todos, filterQuery, filterSelect));
    }
  }, [todos, filterQuery, filterSelect]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={filterQuery}
                onQueryChange={setFilterQuery}
                select={filterSelect}
                onSelectChange={setFilterSelect}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}

              <TodoList
                todos={filteredTodos}
                selectedTodo={selectedTodo}
                onTodoClick={handleTodoClick}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={handleCloseModal} />
      )}
    </>
  );
};
