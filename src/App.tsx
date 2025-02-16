/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | undefined>(undefined);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [query, setSelectedQuery] = useState('');

  useEffect(() => {
    getTodos().then(result => {
      let filteredResult = result;

      if (selectedStatus !== 'all') {
        filteredResult = filteredResult.filter(todo =>
          selectedStatus === 'active' ? !todo.completed : todo.completed,
        );
      }

      if (query) {
        filteredResult = filteredResult.filter(todo =>
          todo.title.toLowerCase().includes(query.toLowerCase()),
        );
      }

      setTodos(filteredResult);
      setIsLoaded(true);
    });
  }, [selectedStatus, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelect={setSelectedStatus}
                onChange={setSelectedQuery}
              />
            </div>

            <div className="block">
              {!isLoaded ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todos}
                  selectedTodo={selectedTodo}
                  onSelect={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal onClose={setSelectedTodo} post={selectedTodo} />
      )}
    </>
  );
};
