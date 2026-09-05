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

export const App: React.FC = () => {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPressed, setIsPressed] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  useEffect(() => {
    getTodos().then(data => {
      setTodo(data);
      setLoading(false);
    });
  }, []);

  const filteredTodos = todo.filter(element => {
    let matchesStatus = true;

    if (status === 'active') {
      matchesStatus = element.completed === false;
    }

    if (status === 'completed') {
      matchesStatus = element.completed === true;
    }

    return (
      matchesStatus && element.title.toLowerCase().includes(query.toLowerCase())
    );
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                status={status}
                onQueryChange={setQuery}
                onStatusChange={setStatus}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onSelected={newElement => {
                    setIsPressed(newElement);
                  }}
                  selectedTodoId={isPressed}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {isPressed !== null && (
        <TodoModal
          selectedTodoId={isPressed}
          todos={todo}
          onClose={() => {
            setIsPressed(null);
          }}
        />
      )}
    </>
  );
};
