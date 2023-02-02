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
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const getTodosFromServer = async () => {
    const todosFromServer = await getTodos();

    setTodos(todosFromServer);
    setIsDataLoaded(true);
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  const filteredTodos = todos
    .filter(todo => {
      switch (filter) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return true;
      }
    })
    .filter(todo => {
      const lowerQuery = query.toLowerCase();
      const lowerTitle = todo.title.toLowerCase();

      return lowerTitle.includes(lowerQuery);
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
                setQuery={setQuery}
                setFilter={setFilter}
              />
            </div>

            <div className="block">
              {!isDataLoaded && <Loader />}
              <TodoList
                todos={filteredTodos}
                setSelectedTodoId={setSelectedTodoId}
                selectedTodoId={selectedTodoId}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId
      && (
        <TodoModal
          selectedTodoId={selectedTodoId}
          setSelectedTodoId={setSelectedTodoId}
          todos={filteredTodos}
        />
      )}
    </>

  );
};
