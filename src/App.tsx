/* eslint-disable max-len */

import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';
import { Field } from './types/FilterField';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [filteredField, setFilteredField] = useState<Field | string>(Field.All);
  const [query, setQuery] = useState<string>('');

  const preparedTodos = todos.filter(todo => {
    const filteredByField = (() => {
      switch (filteredField) {
        case Field.Completed:
          return todo.completed;
        case Field.Active:
          return !todo.completed;
        default:
          return true;
      }
    })();

    const filteredByQuery = query
      ? todo.title.toLowerCase().includes(query.toLowerCase())
      : true;

    return filteredByField && filteredByQuery;
  });

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const handleTodo = (todo: Todo) => {
    setIsLoading(true);
    setSelectedTodo(todo);

    getUser(todo.userId)
      .then(setUser)
      .finally(() => setIsLoading(false));
  };

  const handleChangeStatus = (newStatus: string) => {
    setFilteredField(newStatus);
  };

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const onReset = () => {
    setQuery('');
    setFilteredField(Field.All);
    setSelectedTodo(null);
    setUser(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onChangeStatus={handleChangeStatus}
                query={query}
                onChangeQuery={handleChangeQuery}
                onReset={onReset}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={preparedTodos}
                showSelectedTodo={handleTodo}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          user={user}
          todo={selectedTodo}
          onReset={onReset}
          setUser={setUser}
        />
      )}
    </>
  );
};
