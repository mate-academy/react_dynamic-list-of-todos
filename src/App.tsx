/* eslint-disable max-len */
import React, { useEffect, useState, useCallback } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import axios from 'axios';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import type { Todo } from './types/Todo';

export type TodoFilterStatus = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [sort, setSort] = useState<TodoFilterStatus>('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const selectTodo = (todoId: number) => {
    setSelectedTodo(todos.find((todo) => todo.id === todoId) || null);
  };

  const closeModal = () => {
    setSelectedTodo(null);
  };

  const loadTodos = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get<Todo[]>(
        'https://mate-academy.github.io/react_dynamic-list-of-todos/api/todos.json',
      );

      setTodos(response.data);

      setIsLoading(false);
    } catch (error: unknown) {
      setIsLoading(false);
    }
  };

  const sortTodos = useCallback(
    (todosToSort: Todo[]) => {
      switch (sort) {
        case 'all':
          return todosToSort;

        case 'active':
          return todosToSort.filter((todo) => !todo.completed);

        case 'completed':
          return todosToSort.filter((todo) => todo.completed);

        default:
          return todosToSort;
      }
    },
    [sort],
  );

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    setFilteredTodos(sortTodos(todos));
  }, [todos, sort]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter changeSort={setSort} />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodo?.id || 0}
                  onSelect={selectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          isLoading={isLoading}
          todo={selectedTodo}
          onClose={closeModal}
        />
      )}
    </>
  );
};
