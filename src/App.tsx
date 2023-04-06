/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { SortType } from './enums/SortType';
import { filterTodos } from './helpers/filterTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentTodoId, setCurrentTodoId] = useState(0);
  const [listLoad, setListLoad] = useState(false);
  const [query, setQuery] = useState('');
  const [sortType, setSortType] = useState(SortType.All);

  async function getTodosFromServer() {
    setListLoad(true);
    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
    } catch (error) {
      setTodos([]);
    }

    setListLoad(false);
  }

  useEffect(() => {
    getTodosFromServer();
  }, []);

  const currentTodo = todos.find(todo => todo.id === currentTodoId);

  const closeTodo = () => setCurrentTodoId(0);

  const visibleTodos = filterTodos(todos, sortType, query);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={setQuery}
                sortType={sortType}
                onSortTypeChange={setSortType}
              />
            </div>

            <div className="block">
              {listLoad ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  activeId={currentTodoId}
                  onSelectTodo={setCurrentTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {currentTodo && (
        <TodoModal todo={currentTodo} onClose={closeTodo} />
      )}
    </>
  );
};
