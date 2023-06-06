/* eslint-disable max-len */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>();
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    getTodos()
      .then(setTodos);
  }, []);

  const filteredTodos = useMemo(() => {
    let currentTodos = todos;
    const formatedQuery = query.trim().toLowerCase();

    if (filterType !== 'all') {
      currentTodos = currentTodos.filter((todo) => {
        const { completed } = todo;

        return ((filterType === 'completed' && completed)
          || (filterType === 'active' && !completed));
      });
    }

    if (formatedQuery) {
      currentTodos = currentTodos.filter((todo) => (todo.title.toLowerCase().includes(formatedQuery)));
    }

    return currentTodos;
  }, [todos, query, filterType]);

  const handleSelectTodo = (todo: Todo) => {
    setCurrentTodo(todo);
    getUser(todo.userId)
      .then(setCurrentUser);
  };

  const handleCloseModal = useCallback(() => {
    setCurrentTodo(null);
    setCurrentUser(null);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterType={filterType}
                query={query}
                onChooseFilter={setFilterType}
                onQuery={setQuery}
              />
            </div>

            <div className="block">
              {!filteredTodos.length && (<Loader />)}
              <TodoList
                todos={filteredTodos}
                currentTodo={currentTodo}
                onSelectTodo={handleSelectTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal
          currentTodo={currentTodo}
          currentUser={currentUser}
          onCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};
