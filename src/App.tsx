/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Filter } from './types/Filter';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.all);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [todoId, setTodoId] = useState<number | null>(null);

  const findTodoById = (id: number, todosArr: Todo[]): Todo => {
    return todosArr.find(todo => todo.id === id) as Todo;
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
                search={search}
                setSearch={setSearch}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  search={search}
                  filter={filter}
                  todos={todos}
                  setTodoId={setTodoId}
                  todoId={todoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {todoId && (
        <TodoModal
          todo={findTodoById(todoId, todos)}
          todoId={todoId}
          setTodoId={setTodoId}
        />
      )}
    </>
  );
};
