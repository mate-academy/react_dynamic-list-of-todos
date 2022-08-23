/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Sort } from './types/Sort';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<string>(Sort.ALL);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .then(() => setLoaded(true));
  }, []);

  const filteredTodos = todos.filter(todo => {
    if (status === Sort.ACTIVE && todo.completed) {
      return false;
    }

    if (status === Sort.COMPLETED && !todo.completed) {
      return false;
    }

    return todo.title.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {!loaded
              ? <Loader />
              : (
                <>
                  <h1 className="title">Todos:</h1>

                  <div className="block">
                    <TodoFilter
                      setQuery={setQuery}
                      setStatus={setStatus}
                      query={query}
                      status={status}
                    />
                  </div>
                  <div className="block">
                    {!loaded && <Loader />}
                    <TodoList
                      todos={filteredTodos}
                      onTodoSelected={setSelectedTodo}
                      currentTodo={selectedTodo}
                    />
                  </div>
                </>
              )}
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
