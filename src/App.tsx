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
import { Filters } from './types/Filters';

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<Filters>(Filters.All);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(todosFromServer => setVisibleTodos(todosFromServer))
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = visibleTodos
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()))
    .filter(todo => {
      if (status === Filters.All) {
        return true;
      }

      return status === Filters.Completed ? todo.completed : !todo.completed;
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
                status={status}
                setStatus={setStatus}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && filteredTodos.length > 0 && (
                <TodoList
                  selectedTodo={selectedTodo}
                  todos={filteredTodos}
                  onTodoSelect={todo => setSelectedTodo(todo)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onCloseTodo={todo => setSelectedTodo(todo)}
        />
      )}
    </>
  );
};
