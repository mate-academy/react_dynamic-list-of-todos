/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [isData, setIsData] = useState(false);
  const [todos, setTodo] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedId, setSelectedId] = useState(0);

  const visibleTodos = todos
    .filter(todo => {
      if (filter === 'active') {
        return todo.completed === false;
      }

      if (filter === 'completed') {
        return todo.completed === true;
      }

      return true;
    })
    .filter(todo => {
      const lowerTitle = todo.title.toLocaleLowerCase();
      const lowerQuery = query.toLocaleLowerCase();

      return lowerTitle.includes(lowerQuery);
    });

  useEffect(() => {
    getTodos()
      .then(response => {
        setTodo(response);
      })
      .catch(e => e)
      .finally(() => setIsData(true));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={value => setQuery(value)}
                filter={value => setFilter(value)}
                reject={() => setQuery('')}
              />
            </div>

            <div className="block">
              {!isData && <Loader />}
              {isData && (
                <TodoList
                  todos={visibleTodos}
                  selectedUser={selectedId}
                  changeSelectUser={(id: number) => {
                    setSelectedId(id);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedId !== 0 && (
        <TodoModal
          selectId={selectedId}
          todos={todos}
          reject={() => setSelectedId(0)}
        />
      )}
    </>
  );
};
