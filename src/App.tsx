import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isSelected, setIsSelected] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState(Status.All);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(item => setTodos(item))
      .catch(() => {
        throw new Error('something wrong');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos: Todo[] = useMemo(() => {
    let todoList = [...todos];

    if (query) {
      todoList = todoList.filter(
        todo => todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    switch (filterStatus) {
      case (Status.ACTIVE):
        return todoList.filter(todo => !todo.completed);

      case (Status.COMPLETED):
        return todoList.filter(todo => todo.completed);

      default:
        return todoList;
    }
  }, [query, todos, filterStatus]);

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
                setFilterStatus={setFilterStatus}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  isSelected={isSelected}
                  setIsSelected={setIsSelected}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {isSelected && (
        <TodoModal
          isSelected={isSelected}
          setIsSelected={setIsSelected}
        />
      )}
    </>
  );
};
