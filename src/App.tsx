/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './utils/todos';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState([]);
  const [todosLoading, setTodosLoading] = useState(false);
  const [selectTodo, setSelectTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState(Filter.ALL);
  const [queryFilter, setQueryFilter] = useState('');

  function getFilterTodos(todose: Todo[], filters: string, query: string) {
    let preparedTodos = [...todose];
    const normalizedQuery = query.toLowerCase().trim();

    switch (filters) {
      case Filter.ACTIVE:
        preparedTodos = preparedTodos.filter(
          (todo) => todo.completed === false,
        );
        break;

      case Filter.COMPLETED:
        preparedTodos = preparedTodos.filter((todo) => todo.completed === true);
        break;

      default:
        break;
    }

    if (normalizedQuery) {
      preparedTodos = preparedTodos.filter(
        (todo: Todo) => todo.title.toLowerCase().includes(normalizedQuery),
      );
    }

    return preparedTodos;
  }

  useEffect(() => {
    setTodosLoading(true);
    setTimeout(() => {
      getTodos()
        .then((todo) => {
          setTodos(todo);
        })
        .catch(() => {})
        .finally(() => setTodosLoading(false));
    }, 1000);
  }, []);

  const visibleTodos = getFilterTodos(todos, filter, queryFilter);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterBy={setFilter}
                queryFilterValue={queryFilter}
                queryFilterBy={setQueryFilter}
              />
            </div>

            <div className="block">
              {todosLoading && <Loader />}

              {!todosLoading && (<TodoList todos={visibleTodos} onSelect={setSelectTodo} selectedTodo={selectTodo} />)}

            </div>
          </div>
        </div>
      </div>

      {selectTodo && (
        <TodoModal selectTodo={selectTodo} selectTodoBy={setSelectTodo} />
      )}
    </>
  );
};
