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
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<Status>('all');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .then(() => setLoaded(true));
  }, []);

  const filteredTodos = todos.filter(todo => {
    if (status === 'active' && todo.completed) {
      return false;
    }

    if (status === 'completed' && !todo.completed) {
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
                      onInput={setQuery}
                      changeStatus={setStatus}
                      query={query}
                      status={status}
                    />
                  </div>

                  <div className="block">
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
