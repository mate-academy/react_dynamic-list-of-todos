/* eslint-disable max-len */
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import React, { useEffect, useState } from 'react';
import { Todo } from './types/Todo';

import { Loader } from './components/Loader';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { getFilteredTodos } from './tools/filter';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState(0);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    getTodos().then((todosFromAPI => {
      setTodos(todosFromAPI);
    }));
  }, []);

  const handleClickTodo = (todoId: number) => {
    setSelectedTodo(todoId);
  };

  const todo = todos.find(item => item.id === selectedTodo);

  const visibleTodos = getFilteredTodos(todos, query, filter);

  const handleCloseModal = () => {
    setSelectedTodo(0);
  };

  const handleChange = (value: string) => {
    setQuery(value);
  };

  const handleChangeFilter = (value: string) => {
    setFilter(value);
  };

  const handleDeleteQuery = () => {
    setQuery('');
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onChange={handleChange}
                query={query}
                value={filter}
                onDeleteQuery={handleDeleteQuery}
                onFilterChange={handleChangeFilter}
              />
            </div>

            <div className="block">
              {todos.length ? (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                  onCLick={handleClickTodo}
                />
              ) : <Loader />}

            </div>
          </div>
        </div>
      </div>

      {todo && (
        <TodoModal
          todo={todo}
          onCancelModal={handleCloseModal}
        />
      )}
    </>
  );
};
