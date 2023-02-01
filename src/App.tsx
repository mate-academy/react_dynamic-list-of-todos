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
  const [selectedTodo, setSelectedTodo] = useState<Todo>();
  const [isSelected, setIsSelected] = useState(false);
  const [filter, setSelectedFilter] = useState('all');

  const loadingAllTodos = async () => {
    const loadedTodos = await getTodos();

    const completedTodos = loadedTodos.filter((todo) => todo.completed);

    const activeTodos = loadedTodos.filter((todo) => !todo.completed);

    switch (filter) {
      case 'all':
        return setTodos(loadedTodos);
      case 'active':
        return setTodos(activeTodos);
      case 'completed':
        return setTodos(completedTodos);

      default:
        return 0;
    }
  };

  useEffect(() => {
    loadingAllTodos();
  }, [filter, selectedTodo]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSetSelectedFilter={setSelectedFilter}
                filter={filter}
              />
            </div>
            <div className="block">
              {todos.length === 0
                ? (
                  <Loader />
                )
                : (
                  <TodoList
                    todos={todos}
                    onSetSelectedTodo={setSelectedTodo}
                    onSetIsSelected={setIsSelected}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && isSelected
        ? (
          <TodoModal
            selectedTodo={selectedTodo}
            onSetIsSelected={setIsSelected}
          />
        )
        : (
          <Loader />
        )}
    </>
  );
};
