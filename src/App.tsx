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

export const enum SortMethod {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const App: React.FC = () => {
  const [isLoader, setIsLoader] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [methodFilter, setMethodFilter] = useState(SortMethod.All);
  const [value, setValue] = useState('');
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setIsLoader(true);

    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .finally(() => setIsLoader(false));
  }, []);

  const filteredTodos = todos
    .filter(todo => {
      switch (methodFilter) {
        case SortMethod.Active:
          return !todo.completed;
        case SortMethod.Completed:
          return todo.completed;
        default:
          return true;
      }
    })
    .filter(todo => todo.title.toLowerCase().includes(value.toLowerCase()));

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                method={methodFilter}
                setMethod={setMethodFilter}
                value={value}
                setValue={setValue}
              />
            </div>

            <div className="block">
              {isLoader ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={activeTodo}
                  onSelectedTodo={setActiveTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {activeTodo && (
        <TodoModal
          selectedTodo={activeTodo}
          onCloseSelectedTodo={() => setActiveTodo(null)}
        />
      )}
    </>
  );
};
