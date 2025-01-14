/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentUser, setCurrentUser] = useState<number>(0);
  const [currentTodo, setCurrentTodo] = useState<Todo>({
    id: 0,
    title: '',
    completed: false,
    userId: 0,
  } as Todo);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getTodos(filter)
      .then(todosFromServer =>
        todosFromServer.filter(todo =>
          todo.title.toLowerCase().includes(query.toLowerCase()),
        ),
      )
      .then(todosFromServer => setTodos(todosFromServer))
      .finally(() => setIsLoading(false));
  }, [filter, query]);

  const handleIsOpened = (isOpen: boolean) => {
    setIsOpened(isOpen);

    if (!isOpen) {
      setCurrentTodo({ id: 0, title: '', completed: false, userId: 0 } as Todo);
    }
  };

  const handleCurrentUser = (userId: number) => {
    setCurrentUser(userId);
  };

  const handleCurrentTodo = useCallback((todo: Todo) => {
    setCurrentTodo(todo);
  }, []);

  const handleFilter = (filterType: 'all' | 'active' | 'completed') => {
    setFilter(filterType);
  };

  const handleQuery = (inputQuery: string) => {
    setQuery(inputQuery);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleFilter={handleFilter}
                handleQuery={handleQuery}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={todos}
                currentTodo={currentTodo}
                handleIsOpened={handleIsOpened}
                handleCurrentUser={handleCurrentUser}
                handleCurrentTodo={handleCurrentTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {isOpened && (
        <TodoModal
          todo={currentTodo}
          user={currentUser}
          handleIsOpened={handleIsOpened}
        />
      )}
    </>
  );
};
