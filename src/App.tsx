/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoFilter } from './components/TodoFilter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterTodo, setFilterTodo] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState(0);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      const loadTodo = await getTodos();

      setTodos(loadTodo);
      setFilterTodo(loadTodo);
      setLoading(true);
    };

    load();
  }, []);

  const filteredTodos = (status: string, query: string) => {
    const todoFilter = todos.filter(todo => {
      switch (status) {
        case 'active':
          return !todo.completed && todo.title.includes(query);

        case 'completed':
          return todo.completed && todo.title.includes(query);

        default:
          return todo.title.includes(query);
      }
    });

    setFilterTodo(todoFilter);
  };

  const todoSelect = (query: number) => setSelectedTodo(query);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter filteredTodos={filteredTodos} />
            </div>

            <div className="block">
              {!loading
                ? (
                  <Loader />
                ) : (
                  <TodoList
                    todos={filterTodo}
                    selectTodo={todoSelect}
                    selectedTodo={selectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo > 0 && (
        <TodoModal
          todo={filterTodo.find(todo => todo.id === selectedTodo)}
          selectUser={todoSelect}
        />
      )}

    </>
  );
};
