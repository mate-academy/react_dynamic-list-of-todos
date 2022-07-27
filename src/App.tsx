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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchFilter, setSearchFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const lowerCasequery = query.toLocaleLowerCase();

  const displayedTodos = todos.filter(todo => {
    if ((searchFilter === 'Active' && todo.completed)
    || (searchFilter === 'Completed' && !todo.completed)) {
      return false;
    }

    return todo.title.toLowerCase().includes(lowerCasequery);
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onSetSearch={setSearchFilter}
                onsetQuery={setQuery}
              />
            </div>

            <div className="block">
              {todos.length > 0
                ? (
                  <TodoList
                    todos={displayedTodos}
                    selectedTodoId={selectedTodo?.id}
                    selectTodo={setSelectedTodo}
                  />
                ) : (
                  <Loader />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo?.id && (
        <TodoModal
          unSelectTodo={() => setSelectedTodo(null)}
          todo={selectedTodo}
        />
      )}
    </>
  );
};
