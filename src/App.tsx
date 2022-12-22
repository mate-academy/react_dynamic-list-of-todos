/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

import { getTodos } from './api';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [query, setQuery] = useState('');

  const loadTodos = async () => {
    const todosList = await getTodos();

    setTodosFromServer(todosList);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const todos = useMemo(() => (
    todosFromServer
      .filter(todo => todo.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
      .filter(todo => {
        switch (filterStatus) {
          case 'completed':
            return todo.completed;

          case 'active':
            return !todo.completed;

          default:
            return true;
        }
      })
  ), [filterStatus, todosFromServer, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {!todosFromServer.length
                ? <Loader />
                : (
                  <TodoList
                    todos={todos}
                    setSelectedTodo={setSelectedTodo}
                    selectedTodo={selectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
