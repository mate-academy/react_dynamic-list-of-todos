/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Filter } from './types/enum/Filter';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const [todoId, setTodoId] = useState<number | null>(null);

  const findTodoById = (id: number, arrayTodos: Todo[]): Todo => {
    return arrayTodos.find(todo => todo.id === id) as Todo;
  };

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                setFilter={setFilter}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              { loading ? (
                <Loader />
              ) : (
                <TodoList
                  query={query}
                  filter={filter}
                  todos={todos}
                  setTodoId={setTodoId}
                  todoId={todoId}
                />
              ) }
            </div>
          </div>
        </div>
      </div>

      {todoId !== null && (
        <TodoModal
          todo={findTodoById(todoId, todos)}
          todoId={todoId}
          setTodoId={setTodoId}
        />
      )}
    </>
  );
};
