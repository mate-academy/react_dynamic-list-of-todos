/* eslint-disable max-len */
import React, { useState, useEffect, useCallback } from 'react';
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
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(gettingTodos => setTodos(gettingTodos));
  }, []);

  const handleSelection = useCallback((selectedTodoId: number) => {
    const foundTodo = todos.find(todo => todo.id === selectedTodoId);

    if (foundTodo) {
      setSelectedTodo(foundTodo);
    }
  }, [todos, selectedTodo]);

  const closeModal = useCallback(() => {
    setSelectedTodo(null);
  }, [todos, selectedTodo]);

  // const filterByTitle = (todos: Todo[]) => {
  //   function searchInput(input: string) {
  //     return input.trim().toLowerCase().includes(query.toLowerCase());
  //   }
  //   setTodos(todos.filter(todo => searchInput(todo.title)));
  // };

  // const filterActiveTodos = (todos: Todo[]) => {
  //   const activeTodos = todos.filter((todo: Todo) => !todo.completed);
  //   setTodos(activeTodos);
  //   setQuery('active')
  // };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {todos.length === 0 ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todos}
                  selectedTodo={selectedTodo}
                  selectTodo={handleSelection}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo
        && (
          <TodoModal
            selectedTodo={selectedTodo}
            closeModal={closeModal}
          />
        )}
    </>
  );
};
