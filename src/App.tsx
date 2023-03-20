/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { SortType } from './types/SortType';
import { getTodos } from './api';

const getVisibleTodos = (
  todos: Todo[],
  sortType: SortType,
  query: string,
): Todo[] => {
  let filtered = todos;

  if (sortType === SortType.Active) {
    filtered = todos.filter(todo => !todo.completed);
  }

  if (sortType === SortType.Completed) {
    filtered = todos.filter(todo => todo.completed);
  }

  return filtered.filter(todo => (
    todo.title.toLowerCase().includes(query.toLowerCase())
  ));
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeTodo, setActiveTodo] = useState<Todo>();
  const [sortType, setSortType] = useState(SortType.All);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(todosFromServer => setTodos(todosFromServer))
      .catch(reason => Error(reason));
  }, []);

  const changeActiveTodo = (id: number) => {
    setActiveTodo(todos.find(todo => todo.id === id));
  };

  const visibleTodos = getVisibleTodos(todos, sortType, query);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                changeSortType={setSortType}
                changeQuery={setQuery}
              />
            </div>

            <div className="block">
              {todos.length
                ? (
                  <TodoList
                    todos={visibleTodos}
                    activeId={activeTodo?.id || 0}
                    setActiveId={changeActiveTodo}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {activeTodo && (
        <TodoModal
          todo={activeTodo}
          onClose={() => changeActiveTodo(0)}
        />
      )}
    </>
  );
};
