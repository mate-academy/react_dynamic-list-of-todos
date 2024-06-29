/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosFilter, setTodosFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState(0);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  function getSelectedTodoById() {
    return todos.find(todo => todo.id === selectedTodoId) || todos[0];
  }

  const filteredTodos = todos
    .filter(todo => {
      if (todosFilter === 'active') {
        return !todo.completed;
      }

      if (todosFilter === 'completed') {
        return todo.completed;
      }

      return true;
    })
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                filter={todosFilter}
                setTodosFilter={setTodosFilter}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodoId}
                  setSelectedTodo={setSelectedTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId !== 0 && (
        <TodoModal
          selectedTodo={getSelectedTodoById()}
          setSelectedTodo={setSelectedTodoId}
        />
      )}
    </>
  );
};
