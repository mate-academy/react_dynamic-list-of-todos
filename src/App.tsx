/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';

export const enum SelectByCompleted {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectByCompleted, setSelectByCompleted] = useState<string>(SelectByCompleted.ALL);
  const [query, setQuery] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState(0);

  const loadTodos = async () => {
    const loadedTodos = await getTodos();

    setTodos(loadedTodos);
    setIsLoaded(true);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  let visibleTodos = [...todos];

  switch (selectByCompleted) {
    case SelectByCompleted.ACTIVE:
      visibleTodos = visibleTodos.filter(todo => !todo.completed);
      break;
    case SelectByCompleted.COMPLETED:
      visibleTodos = visibleTodos.filter(todo => todo.completed);
      break;
    case SelectByCompleted.ALL:
    default:
      visibleTodos = [...todos];
      break;
  }

  if (query) {
    const normalizedQuery = query
      .split(' ')
      .map(word => word.trim().toLowerCase())
      .join(' ');

    visibleTodos = visibleTodos.filter(todo => todo.title.toLowerCase().includes(normalizedQuery));
  }

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId) || null;

  const handleCloseModal = () => {
    setSelectedTodoId(0);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelectByCompletedChange={(option) => setSelectByCompleted(option)}
                query={query}
                onQuery={(newQuery) => setQuery(newQuery)}
              />
            </div>

            <div className="block">
              {isLoaded
                ? (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodoId={selectedTodoId}
                    onSlelectedTodoId={(selectedId) => setSelectedTodoId(selectedId)}
                  />
                ) : (
                  <Loader />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onCloseModal={handleCloseModal} />
      )}
    </>
  );
};
