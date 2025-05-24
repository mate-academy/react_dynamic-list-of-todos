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
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [openTodoId, setOpenTodoId] = useState<number | null>(null);

  useEffect(() => {
    getTodos()
      .then(setAllTodos)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = [...allTodos];

    if (selectedFilter === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    } else if (selectedFilter === 'active') {
      filtered = filtered.filter(todo => !todo.completed);
    }

    if (query.trim()) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    setVisibleTodos(filtered);
  }, [allTodos, selectedFilter, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setSelectedFilter={setSelectedFilter}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  setSelectedTodo={setSelectedTodo}
                  setOpenTodoId={setOpenTodoId}
                  openTodoId={openTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
          setOpenTodoId={setOpenTodoId}
        />
      )}
    </>
  );
};
