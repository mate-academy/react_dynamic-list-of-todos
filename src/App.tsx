/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo, TodosFilterChoice } from './types/Todo';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[] | null>(null);
  const [selectedTodosFilter, setSelectedTodosFilter] =
    useState<TodosFilterChoice>(TodosFilterChoice.all);
  const [filteredTodos, setFilteredTodos] = useState<Todo[] | null>(null);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    if (!todosFromServer) {
      getTodos().then(todos => {
        setTodosFromServer(todos);
      });

      return;
    }

    let updatedTodos = [...todosFromServer];

    if (selectedTodosFilter === TodosFilterChoice.active) {
      updatedTodos = updatedTodos.filter(todo => !todo.completed);
    }

    if (selectedTodosFilter === TodosFilterChoice.completed) {
      updatedTodos = updatedTodos.filter(todo => todo.completed);
    }

    if (query) {
      updatedTodos = updatedTodos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase().trim()),
      );
    }

    setFilteredTodos(updatedTodos);
  }, [todosFromServer, selectedTodosFilter, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilter={setSelectedTodosFilter}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {todosFromServer ? (
                <TodoList
                  todos={filteredTodos}
                  setTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              ) : (
                <Loader />
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
