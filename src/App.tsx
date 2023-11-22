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
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState({ filter: 'all', input: '' });

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleUnselectTodo = () => {
    setSelectedTodo(null);
  };

  const handleUseFilter = (f: string) => {
    setQuery(prevState => {
      return { ...prevState, filter: f };
    });
  };

  const handleUseInput = (i: string) => {
    setQuery(prevState => {
      return { ...prevState, input: i };
    });
  };

  const handleClearInput = () => {
    setQuery(prevState => {
      return { ...prevState, input: '' };
    });
  };

  useEffect(() => {
    getTodos()
      .then(t => {
        setTodos(t);
      });
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (query.filter) {
        case 'all':
          return todo.title.toLowerCase().includes(query.input.toLowerCase());
        case 'active':
          return !todo.completed && todo.title.toLowerCase().includes(query.input.toLowerCase());
        case 'completed':
          return todo.completed && todo.title.toLowerCase().includes(query.input.toLowerCase());
        default:
          return todo.title.toLowerCase().includes(query.input.toLowerCase());
      }
    });
  }, [query.filter, query.input, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos: </h1>

            <div className="block">
              <TodoFilter
                query={query}
                useFilter={handleUseFilter}
                useInput={handleUseInput}
                clearInput={handleClearInput}
              />
            </div>

            <div className="block">
              {todos.length === 0
                ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodos}
                    selectTodo={handleSelectTodo}
                    selectedTodo={selectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} unselectTodo={handleUnselectTodo} />
      )}
    </>
  );
};
