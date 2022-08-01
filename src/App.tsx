/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { SortType } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [status, setStatus] = useState<SortType>(SortType.ALL);
  const [query, setQuery] = useState<string>('');
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setVisibleTodos(todosFromServer);
        setLoading(false);
      });
  }, []);

  const changeFilterBy = (type: SortType) => {
    setStatus(type);
  };

  const handleQuery = (value: string) => {
    setQuery(value);
  };

  const handleFilter = (title: string) => {
    return title.toLowerCase().includes(query.toLowerCase());
  };

  useEffect(() => {
    const filteredTodos = todos.filter(todo => {
      switch (status) {
        case SortType.ALL:
          return handleFilter(todo.title);

        case SortType.ACTIVE:
          return !todo.completed && handleFilter(todo.title);

        case SortType.COMPLETED:
          return todo.completed && handleFilter(todo.title);

        default:
          return setVisibleTodos(todos);
      }
    });

    setVisibleTodos(filteredTodos);
  }, [query, status]);

  const todoToOpen = (todo: Todo | null) => {
    setSelectedTodo(todo);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelectStatus={changeFilterBy}
                changeQuery={handleQuery}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={selectedTodo?.id || 0}
                  todoToOpen={todoToOpen}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={setSelectedTodo}
        />
      )}
    </>
  );
};
