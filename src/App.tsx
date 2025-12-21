/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [status, setStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');

  //useEffect(() => {
  // setLoading(true);
  //getTodos()
  //  .then(data => setTodosFromServer(data))
  //  .finally(() => setLoading(false));
  // }, []);

  useEffect(() => {
    setLoading(true); // включили загрузку

    getTodos().then(data => {
      //запросили данные
      setTodosFromServer(data); //сохранили данные в стейт
      setLoading(false); //отключили загрузку
    });
  }, []);

  const statusFilteredTodos = todosFromServer.filter(todo => {
    if (status === 'active') {
      return !todo.completed; //todoCompleted = false => active
    }

    if (status === 'completed') {
      return todo.completed;
    }

    return true; // all filter take true or false
  });

  const normalizedQuery = query.trim().toLowerCase();
  const visibleTodos = statusFilteredTodos.filter(todo => {
    return todo.title.toLowerCase().includes(normalizedQuery);
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
                onQueryChange={setQuery}
                status={status}
                onStatusChange={setStatus}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                  onSelected={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={() => setSelectedTodo(null)} />
      )}
    </>
  );
};
