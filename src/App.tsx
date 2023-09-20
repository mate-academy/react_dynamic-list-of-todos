/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import * as todosAPI from './api';

function filterTodos(todos: Todo[], filterStatus: string, query: string) {
  return todos
    .filter((todo) => {
      switch (filterStatus) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return true;
      }
    })
    .filter((todo) => {
      if (query.trim() === '') {
        return true;
      }

      return todo.title.toLowerCase().includes(query.toLowerCase());
    });
}


export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isloading, setIsLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [query, setQuery] = useState<string>('');

  const handleFilterChange = (status: string) => {
    setFilterStatus(status);
  };

  const handleSelectedTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleCloseTodo = () => {
    setSelectedTodo(null);
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
  };

  const filteredTodos = filterTodos(todos, filterStatus, query);

  useEffect(() => {
    todosAPI
      .getTodos()
      .then((data) => {
        setTodos(data);
        setIsLoading(false);
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilterChange={handleFilterChange}
                handleQuery={handleQueryChange}
              />
            </div>

            <div className="block">
              {isloading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  handleSelectedTodo={handleSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo !== null && (
        <TodoModal
          selectedTodo={selectedTodo}
          handleCloseTodo={handleCloseTodo}
        />
      )}
    </>
  );
};
