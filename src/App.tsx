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
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [actualTodo, setActualTodo] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterByStatus, setFilterByStatus] = useState<Status>(Status.all);
  const [search, setSearch] = useState<string>('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setLoading(true);
    getTodos().then(todos => {
      setActualTodo(todos);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(todos => {
        if (filterByStatus === Status.all) {
          return todos;
        }

        return todos.filter(todo => {
          switch (filterByStatus) {
            case Status.active:
              return todo.completed === false;
            case Status.completed:
              return todo.completed === true;
          }
        });
      })
      .then(todos => {
        if (search.length === 0) {
          return todos;
        }

        return todos.filter(todo =>
          todo.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
        );
      })
      .then(todos => {
        setActualTodo(todos);
        setLoading(false);
      });
  }, [filterByStatus, search]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedStatus={filterByStatus}
                onSelectedStatus={(newStatus: Status) =>
                  setFilterByStatus(newStatus)
                }
                searchValue={search}
                onSearchValue={searchValue => setSearch(searchValue)}
                onClearSearch={() => setSearch('')}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  actualTodo={actualTodo}
                  onSelectedTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
