/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

import { getTodos } from './api';

const filterTodos = (todos: Todo[], show: string, query: string): Todo[] => {
  let filteredTodos = [...todos];

  if (query) {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.trim().toLowerCase()),
    );
  }

  if (show) {
    switch (show) {
      case 'all':
        return filteredTodos;
      case 'active':
        return filteredTodos.filter(todo => !todo.completed);
      case 'completed':
        return filteredTodos.filter(todo => todo.completed);
      default:
        return filteredTodos;
    }
  }

  return filteredTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [show, setShow] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = filterTodos(todos, show, query);

  const onSelected = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const clearSelectedTodo = () => {
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                show={show}
                query={query}
                setShow={setShow}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && todos.length > 0 && (
                <TodoList
                  todos={filteredTodos}
                  onSelected={onSelected}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClear={clearSelectedTodo} />
      )}
    </>
  );
};
