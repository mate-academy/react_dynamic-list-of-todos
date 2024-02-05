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
import { Filter } from './types/Filter';
import { getFilteredTodos } from './services/filtredTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [sorting, setSorting] = useState<Filter>({ status: 'all', title: '' });

  useEffect(() => {
    getTodos().then(setTodos).catch();
  }, [todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter filterBy={setSorting} />
            </div>

            <div className="block">
              {todos.length ? (
                <TodoList
                  todos={getFilteredTodos(todos, sorting)}
                  selectedTodo={selectedTodo}
                  onTodoSelected={setSelectedTodo}
                />
              ) : (
                <Loader />
              )}

            </div>
          </div>
        </div>
      </div>

      {selectedTodo
        && (
          <TodoModal
            todo={selectedTodo}
            onClose={() => setSelectedTodo(null)}
          />
        )}
    </>
  );
};
