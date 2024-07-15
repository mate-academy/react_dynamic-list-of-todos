/* eslint-disable max-len */
import { FC, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilterStatus } from './types/FilterStatus';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(
    FilterStatus.All,
  );
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    setLoader(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoader(false));
  }, []);

  const filteredTodos = todos
    .filter(todo => {
      if (filterStatus === FilterStatus.Active) {
        return !todo.completed;
      }

      if (filterStatus === FilterStatus.Completed) {
        return todo.completed;
      }

      return true;
    })
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={filterStatus}
                setStatus={setFilterStatus}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loader ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onSelectedTodo={setSelectedTodo}
                  selectedTodo={selectedTodo ? selectedTodo.id : null}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodos={selectedTodo}
          closeTodoModal={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
