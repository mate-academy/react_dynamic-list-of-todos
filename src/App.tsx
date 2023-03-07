/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setTodoId] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>(Filter.ALL);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getTodos()
      .then(setTodos);
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
                searchQuery={search}
                setSearch={setSearch}
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
          unselectTodo={() => setTodoId(null)}
        />
      )}
    </>
  );
};
