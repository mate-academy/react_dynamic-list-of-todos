/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';

export enum Filter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

const getFilteredTodos = (todos: Todo[], value: string, filter: Filter) => {
  let filteredItems = [...todos];

  switch (filter) {
    case Filter.Active:
      filteredItems = todos.filter(item => !item.completed);
      break;

    case Filter.Completed:
      filteredItems = todos.filter(item => item.completed);
      break;

    default:
      break;
  }

  filteredItems = filteredItems.filter(item =>
    item.title.includes(value.toLowerCase()),
  );

  return filteredItems;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [value, setValue] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(res => {
        setTodos(res);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = getFilteredTodos(todos, value, filter);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilter={setFilter}
                setValue={setValue}
                value={value}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && (
                <TodoList
                  todoList={filteredTodos}
                  setSelectedTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo !== null && (
        <TodoModal
          todo={selectedTodo}
          userId={selectedTodo.userId}
          onClose={setSelectedTodo}
        />
      )}
    </>
  );
};
