/* eslint-disable max-len */
import React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Query } from './types/Query';
import { Todo } from './types/Todo';

const TODO_IS_ACTIVE = 'active';
const NO_SPECIFIC_QUERY_FOR_TODO = 'all';

const filterTodosByQuery = (
  todos: Todo[],
  { finishQuery, searchQuery }: Query,
): Todo[] => {
  return todos?.filter(todo => {
    if (finishQuery === NO_SPECIFIC_QUERY_FOR_TODO) {
      return todo.title.toLowerCase().includes(searchQuery.toLowerCase());
    }

    return (
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      todo.completed === (finishQuery === TODO_IS_ACTIVE ? false : true)
    );
  });
};

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const initialTodos = useRef<Todo[]>([]);

  useEffect(() => {
    getTodos()
      .then(todosList => {
        setTodos(todosList);
        initialTodos.current = todosList;
      })
      .catch(error => {
        throw new Error(error);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleEyeClick = useCallback(
    (selectedTodoId: number) => {
      setSelectedTodo(todos.find(todo => todo.id === selectedTodoId) || null);
    },
    [todos],
  );

  const handleFiltrationQueries = useCallback(
    ({ finishQuery, searchQuery }: Query) => {
      setTodos(
        filterTodosByQuery(initialTodos.current, { finishQuery, searchQuery }),
      );
    },
    [initialTodos.current],
  );

  const handleCancelSelection = useCallback(() => {
    setSelectedTodo(null);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter handleFiltrationQueries={handleFiltrationQueries} />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : todos.length > 0 ? (
                <TodoList
                  todos={todos}
                  handleEyeClick={handleEyeClick}
                  selectedTodoId={selectedTodo?.id ?? null}
                />
              ) : (
                'No data found'
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          userTodo={selectedTodo}
          resetSelection={handleCancelSelection}
        />
      )}
    </>
  );
};
