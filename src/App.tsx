/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';
import { initValues } from './helpers/constants';

import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initValues.initTodos);
  const [selectedTodoId, setTodoId] = useState<number>(initValues.initSelectedTodoId);
  const [filter, setFilter] = useState<string>(initValues.initFilter);
  const [search, setSearch] = useState<string>(initValues.initSearch);

  useEffect(() => {
    try {
      getTodos()
        .then(todosFromServer => {
          setTodos(todosFromServer);
        });
    } catch (error) {
      throw new Error(`Unsuccessful load todos from server with following error: ${error}`);
    }
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilter={setFilter}
                filter={filter}
                setSearch={setSearch}
                searchQuery={search}
              />
            </div>

            <div className="block">
              {!todos.length && <Loader />}
              <TodoList
                todos={todos}
                selectedTodo={selectedTodoId}
                selectTodo={setTodoId}
                filter={filter}
                search={search}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId && (
        <TodoModal
          todos={todos}
          selectedTodo={selectedTodoId}
          unselectTodo={() => setTodoId(initValues.initSelectedTodoId)}
        />
      )}
    </>
  );
};
