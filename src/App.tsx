/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import './App.scss';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTodoInfoRequested, setIsTodoInfoRequested] = useState(false);
  const [filter, setFilter] = useState('');
  const [query, setQuery] = useState('');
  const [userId, setUserId] = useState<number | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const loadTodos = async () => {
    try {
      const loadedTodos = await getTodos();

      setIsLoaded(true);
      setTodos(loadedTodos);
    } catch (error) {
      // setIsLoadingError(true)
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  }).filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilter={setFilter}
                filter={filter}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoaded
                ? (
                  <TodoList
                    todos={filteredTodos}
                    setIsTodoInfoRequested={setIsTodoInfoRequested}
                    setUserId={setUserId}
                    setSelectedTodo={setSelectedTodo}
                    isTodoInfoRequested={isTodoInfoRequested}
                  />
                )
                : <Loader />}

            </div>
          </div>
        </div>
      </div>

      {isTodoInfoRequested && (
        <TodoModal
          setIsTodoInfoRequested={setIsTodoInfoRequested}
          userId={userId}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};
