/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
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
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todosStatus, setTodosStatus] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const loadTodos = async () => {
      const response = await getTodos();

      setTodos(response);
    };

    loadTodos();
  }, []);

  const getFilteredTodos = todos.filter((todo) => {
    switch (todosStatus) {
      case 'active':
        return !todo.completed && todo.title.toLowerCase().includes(query.toLowerCase());

      case 'completed':
        return todo.completed && todo.title.toLowerCase().includes(query.toLowerCase());

      default:
        return todo.title.toLowerCase().includes(query.toLowerCase());
    }
  });

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
                todosStatus={todosStatus}
                setTodosStatus={setTodosStatus}
              />
            </div>

            <div className="block">
              {todos.length > 0
                ? (
                  <TodoList
                    todos={getFilteredTodos}
                    selectedTodo={selectedTodo}
                    setSelectedTodo={setSelectedTodo}
                  />
                )
                : <Loader /> }
            </div>
          </div>
        </div>
      </div>
      {selectedTodo
        && (
          <TodoModal
            selectedTodo={selectedTodo}
            setSelectedTodo={setSelectedTodo}
          />
        )}
    </>
  );
};
