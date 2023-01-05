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
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sort, setSort] = useState<TodoFilterStatus>('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');

  const selectTodo = (todoId: number) => {
    setSelectedTodo(todos.find((todo) => todo.id === todoId) || null);
  };

  const closeModal = () => {
    setSelectedTodo(null);
  };

  const loadTodos = async () => {
    try {
      const response = await axios.get<Todo[]>(
        'https://mate-academy.github.io/react_dynamic-list-of-todos/api/todos.json',
      );

      setTodos(response.data);
    } catch (error: unknown) {
      setTodos([]);
    }
  };

  const sortTodos = useCallback(
    (todosToSort: Todo[]) => {
      const cleanQuery = query.trim().toLowerCase();

      switch (sort) {
        case 'active':
          return todosToSort
            .filter((todo) => !todo.completed
              && todo.title
                .toLowerCase()
                .includes(cleanQuery));

        case 'completed':
          return todosToSort
            .filter((todo) => todo.completed
              && todo.title
                .toLowerCase()
                .includes(cleanQuery));

        default:
          return todosToSort
            .filter((todo) => todo.title.toLowerCase().includes(cleanQuery));
      }
    },
    [sort, query],
  );

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                changeSort={setSort}
                changeQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {todos.length ? (
                <TodoList
                  todos={sortTodos(todos)}
                  selectedTodoId={selectedTodo?.id || 0}
                  onSelect={selectTodo}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal todo={selectedTodo} onClose={closeModal} />}
    </>
  );
};
