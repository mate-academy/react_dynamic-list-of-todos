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
import { SortType } from './utils/enums';

export const App: React.FC = () => {
  const [loadedTodos, setLoadedTodos] = useState<Todo[]>([]);
  const [isShowClicked, setIsShowClicked] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [sortType, setSortType] = useState(SortType.All);
  const [query, setQuery] = useState('');

  const selectedTodo = loadedTodos.find(todo => todo.id === selectedUserId) || null;

  useEffect(() => {
    getTodos()
      .then(todos => setLoadedTodos(todos.filter(todo => {
        const { completed, title } = todo;

        const doesQueryMatch = (value: string) => {
          return value.toLowerCase().includes(query.toLowerCase());
        };

        switch (sortType) {
          case SortType.Completed:
            return completed === true && doesQueryMatch(title);

          case SortType.Active:
            return completed === false && doesQueryMatch(title);

          default:
            return doesQueryMatch(title);
        }
      })));
  }, [sortType, query]);

  const onShowClicked = (id: number) => {
    setIsShowClicked(true);
    setSelectedUserId(id);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelect={setSortType}
                sortType={sortType}
                onInput={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {!loadedTodos.length && <Loader />}
              <TodoList
                todos={loadedTodos}
                onShowClicked={onShowClicked}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {isShowClicked && (
        <TodoModal
          setIsClicked={setIsShowClicked}
          selectedTodo={selectedTodo}
          setSelectedId={setSelectedUserId}
        />
      )}
    </>
  );
};
