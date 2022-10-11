import React, { useState, useEffect } from 'react';
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
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const visibleTodos = todos.filter(todo => {
    const isMatched = todo.title.toLowerCase().includes(query.toLowerCase());

    switch (status) {
      case 'active':
        return isMatched && todo.completed === false;
      case 'completed':
        return isMatched && todo.completed === true;
      default:
        return isMatched;
    }
  });

  useEffect(() => {
    getTodos().then(tod => {
      setTodos(tod);
      setIsLoaded(true);
    });
  }, []);

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
                setAll={setStatus}
                setTodo={status}
              />
            </div>

            <div className="block">

              {isLoaded
                ? (
                  <TodoList
                    todos={visibleTodos}
                    setSelectedTodo={setSelectedTodo}
                    selectedTodo={selectedTodo}
                  />
                ) : (
                  <Loader />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      ) }
    </>
  );
};
