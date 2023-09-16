/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { TodoType } from './types/TodoType';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [titleFilter, setTitleFilter] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<TodoType | null>(null);

  function filterTodos(filterType: string): TodoType[] {
    switch (filterType) {
      case 'active':
        return todos.filter(todo => !todo.completed);

      case 'completed':
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }

  let visibleTodos = filterTodos(filter);

  function filterByTitle(): TodoType[] {
    return visibleTodos.filter(todo => todo.title
      .toLowerCase()
      .includes(titleFilter.toLowerCase()));
  }

  visibleTodos = filterByTitle();

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter setFilter={setFilter} setTitleFilter={setTitleFilter} />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && todos.length > 0
                && <TodoList todos={visibleTodos} selectedTodo={selectedTodo} setSelectedTodo={setSelectedTodo} />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal todo={selectedTodo} setSelectedTodo={setSelectedTodo} />}
    </>
  );
};
