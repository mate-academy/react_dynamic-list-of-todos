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
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState({ filter: Filter.ALL, input: '' });

  const handleTodoSelect = (todo: Todo | null) => {
    setSelectedTodo(todo);
  };

  const handleFilterChange = (f: Filter) => {
    setQuery(prevState => {
      return { ...prevState, filter: f };
    });
  };

  const handleInputChange = (i: string) => {
    setQuery(prevState => {
      return { ...prevState, input: i };
    });
  };

  const handleInputClear = () => {
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
        case Filter.ALL:
          return todo.title.toLowerCase().includes(query.input.toLowerCase());
        case Filter.ACTIVE:
          return !todo.completed && todo.title.toLowerCase().includes(query.input.toLowerCase());
        case Filter.COMPLETED:
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
                onFilterChange={handleFilterChange}
                onInputChange={handleInputChange}
                onInputClear={handleInputClear}
              />
            </div>

            <div className="block">
              {!todos.length
                ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodos}
                    onTodoSelect={handleTodoSelect}
                    selectedTodo={selectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} onTodoSelect={handleTodoSelect} />
      )}
    </>
  );
};
