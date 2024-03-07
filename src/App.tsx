/* eslint-disable max-len */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

function filterTodos(todos: Todo[], statusQuery: string, titleQuery: string) {
  let filteredTodos;

  switch (statusQuery) {
    case 'completed':
      filteredTodos = todos.filter(todo => todo.completed);
      break;
    case 'active':
      filteredTodos = todos.filter(todo => !todo.completed);
      break;
    default:
      filteredTodos = [...todos];
  }

  return filteredTodos.filter(todo =>
    todo.title.toLowerCase().includes(titleQuery),
  );
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [statusQuery, setStatusQuery] = useState('');
  const [titleQuery, setTitleQuery] = useState('');

  const filteredTodos = useMemo(() => {
    return filterTodos(todos, statusQuery, titleQuery);
  }, [todos, statusQuery, titleQuery]);

  useEffect(() => {
    getTodos().then(todosFromServer => {
      setTodos(todosFromServer);
      setIsLoading(false);
    });
  }, []);

  const handleModalClick = useCallback((todo: Todo) => {
    setSelectedTodo(todo);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedTodo(null);
  }, []);

  const applyStatusQuery = (newQuery: string) => {
    setStatusQuery(newQuery);
  };

  const applyTitleQuery = (newQuery: string) => {
    setTitleQuery(newQuery);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                applyStatusQuery={applyStatusQuery}
                applyTitleQuery={applyTitleQuery}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && (
                <TodoList
                  todos={filteredTodos}
                  handleModalClick={handleModalClick}
                  selectedTodoId={selectedTodo?.id || null}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo !== null && (
        <TodoModal todo={selectedTodo} handleCloseModal={handleCloseModal} />
      )}
    </>
  );
};
