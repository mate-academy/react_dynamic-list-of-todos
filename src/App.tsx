/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [todoStatus, setTodoStatus] = useState('all');

  useEffect(() => {
    getTodos().then(setAllTodos);
  }, []);

  const filteredTodos = useMemo(() => {
    return allTodos.filter((todo) => {
      const filteredByQuery = todo.title
        .toLowerCase()
        .includes(query.toLowerCase());

      switch (todoStatus) {
        case 'active':
          return !todo.completed && filteredByQuery;

        case 'completed':
          return todo.completed && filteredByQuery;

        case 'all':
        default:
          return filteredByQuery;
      }
    });
  }, [todoStatus, allTodos, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onSetQuery={setQuery}
                todoStatus={todoStatus}
                onSetStatus={setTodoStatus}
              />
            </div>

            <div className="block">
              {!allTodos.length && (
                <Loader />
              )}

              <TodoList
                todos={filteredTodos}
                selectedTodo={selectedTodo}
                setSelectedTodo={setSelectedTodo}
                onClose={setIsModalOpen}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && isModalOpen && (
        <TodoModal
          todo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
          onClose={setIsModalOpen}
        />
      )}
    </>
  );
};
