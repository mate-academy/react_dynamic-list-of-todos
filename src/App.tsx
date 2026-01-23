/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { handleChangeTodos } from './utils/functions/handleChangeTodos';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterTodos, setFilterTodos] = useState<string>('all');
  const [searchTodos, setSearchTodos] = useState<string>('');

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodoList)
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleResetSearch = () => {
    setSearchTodos('');
  };

  const handleFilterTodo = (filterField: string) => {
    setFilterTodos(filterField);
  };

  const handleSearchTodo = (query: string) => {
    setSearchTodos(query);
  };

  const filteredTodos = useMemo(() => {
    return handleChangeTodos(todoList, filterTodos, searchTodos);
  }, [filterTodos, searchTodos, todoList]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={searchTodos}
                onReset={handleResetSearch}
                onSearch={value => {
                  handleSearchTodo(value);
                }}
                onFilter={filter => {
                  handleFilterTodo(filter);
                }}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  onSelect={todo => {
                    setSelectedTodo(todo);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onCancel={() => {
            setSelectedTodo(null);
          }}
        />
      )}
    </>
  );
};
