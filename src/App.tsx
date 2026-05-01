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
  const [filterTodos, setFilterTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    getTodos().then(allTodos => {
      setTodos(allTodos);
      setFilterTodos(allTodos);
      isLoading(false);
    });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilterTodos={(prev: Todo[]) => setFilterTodos(prev)}
                todos={todos}
              />
            </div>

            <div className="block">
              {!loading ? (
                <TodoList
                  todos={filterTodos}
                  setSelectedTodo={prev => setSelectedTodo(prev)}
                  selectedTodo={selectedTodo}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={prev => setSelectedTodo(prev)}
        />
      )}
    </>
  );
};
