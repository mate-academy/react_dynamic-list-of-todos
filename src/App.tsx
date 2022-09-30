/* eslint-disable max-len */
import React, { useEffect, useState, useMemo } from 'react';
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
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredBy, setFilteredBy] = useState('all');
  const [query, setQuery] = useState('');

  function toLowerCase(str: string, inputQuery: string): boolean {
    return str
      .toLowerCase()
      .includes(inputQuery.toLowerCase());
  }

  const visibleTodos = useMemo(() => {
    switch (filteredBy) {
      case 'all':
        return (todos.filter(({ title }) => toLowerCase(title, query)));
      case 'active':
        return (todos.filter(todo => todo.completed === false)
          .filter(({ title }) => toLowerCase(title, query)));
      case 'completed':
        return (todos.filter(todo => todo.completed === true)
          .filter(({ title }) => toLowerCase(title, query)));
      default:
        return [];
    }
  }, [filteredBy, todos, query]);

  useEffect(() => {
    const downloadData = async () => {
      const data = await getTodos()
        .then(todo => {
          setTodos(todo);
          setIsLoading(false);
        });

      return data;
    };

    downloadData();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilteredBy={setFilteredBy}
                setQuery={setQuery}
                filteredBy={filteredBy}
                query={query}
              />
            </div>

            <div className="block">

              { isLoading
                ? <Loader />
                : (
                  <TodoList
                    todo={visibleTodos}
                    selectedTodoId={selectedTodo}
                    selectedTodo={setSelectedTodo}
                    selectedUserId={setSelectedUserId}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo
        && (
          <TodoModal
            userId={selectedUserId}
            selectedTodoId={selectedTodo}
            selectedTodo={setSelectedTodo}
            selectedUserId={setSelectedUserId}
          />
        )}
    </>
  );
};
