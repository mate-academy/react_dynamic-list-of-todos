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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [loading, setLoading] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(0);

  const handleLoading = () => {
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    {
      getTodos()
        .then(data => {
          setTodos(data);
        })
        .finally(() => handleLoading());
    }
  }, []);

  const filteredTodos = useMemo(() => {
    let list = todos;

    if (status === 'active') {
      list = list.filter(todo => !todo.completed);
    } else if (status === 'completed') {
      list = list.filter(todo => todo.completed);
    }

    if (query.trim()) {
      list = list.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return list;
  }, [status, todos, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={setQuery}
                onStatusChange={setStatus}
                displayOption={status}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && (
                <TodoList
                  todos={filteredTodos}
                  onTodoSelect={setSelectedTodoId}
                  selectedTodo={selectedTodoId}
                />
              )}
              {selectedTodoId > 0 && (
                <TodoModal
                  todos={todos}
                  selectedTodo={selectedTodoId}
                  onClose={setSelectedTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
