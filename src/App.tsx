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
  const [todos, setTodos] = useState([] as Todo[]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filter, setFilter] = useState({ status: '', query: '' });
  const [modalTodo, setModalTodo] = useState<Todo | null>(null);

  const loadTodos = async () => {
    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
      setIsLoaded(true);
    } catch (error) {
      Promise.reject();
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const visibleTodos = todos.filter(todo => {
    const queryLoweCase = filter.query.toLowerCase().trim();
    const titleLowerCase = todo.title.toLowerCase();
    let status = null;

    switch (filter.status) {
      case 'active':
        status = false;
        break;
      case 'completed':
        status = true;
        break;
      default:
        status = null;
        break;
    }

    return status !== null
      ? titleLowerCase.includes(queryLoweCase) && todo.completed === status
      : titleLowerCase.includes(queryLoweCase);
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                onFilterChange={setFilter}
              />
            </div>

            <div className="block">
              {!isLoaded
                ? <Loader />
                : <TodoList todos={visibleTodos} onTodoSelect={setModalTodo} selectedTodo={modalTodo} />}
            </div>
          </div>
        </div>
      </div>

      {modalTodo && <TodoModal todo={modalTodo} onModalChange={setModalTodo} />}
    </>
  );
};
