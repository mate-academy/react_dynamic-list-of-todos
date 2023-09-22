/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { FilterType, filterTodos } from './utils/filter';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodos, setSelectedTodos] = useState<Todo[]>([]);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);
  const [todoType, setTodoType] = useState(FilterType.All);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const filteredTodos = filterTodos(todos, todoType, query);

    setSelectedTodos(filteredTodos);
  }, [query, todoType, todos]);

  const handleSetActiveTodo = (activeId: number) => {
    if (todos !== null) {
      const todoTemp = todos.find((todo) => todo.id === activeId) || null;

      setActiveTodo(todoTemp);
    }
  };

  const handleClose = () => {
    setActiveTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onChangeQuery={setQuery}
                onChangeType={setTodoType}
                query={query}
              />
            </div>

            <div className="block">
              {(isLoading)
                ? <Loader />
                : <TodoList todos={selectedTodos} activeTodoId={activeTodo?.id} onSetActiveTodo={handleSetActiveTodo} />}

            </div>
          </div>
        </div>
      </div>
      {activeTodo && (
        <TodoModal todo={activeTodo} onCloseModal={handleClose} />
      )}

    </>
  );
};
