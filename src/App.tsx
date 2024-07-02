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
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const selectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const closeModal = () => {
    setSelectedTodo(null);
  };

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(tod => {
        setTodos(tod);
        setFilteredTodos(tod);
      })

      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter filteredTodos={setFilteredTodos} todos={todos} />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && todos.length > 0 && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  selectTodo={(todo: Todo | null) =>
                    todo ? selectTodo(todo) : null
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal todo={selectedTodo} closeModal={closeModal} />
      )}
    </>
  );
};
