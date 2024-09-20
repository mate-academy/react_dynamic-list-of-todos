/* eslint-disable max-len */
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import React, { useEffect, useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { TodoStatus } from './types/TodoStatus';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [todoStatus, setTodoStatus] = useState<TodoStatus>('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then(tds => {
        return tds.filter(todo =>
          todo.title.toLowerCase().includes(query.toLowerCase()),
        );
      })
      .then(tds => {
        return tds.filter(todo => {
          if (todoStatus === 'active') {
            return !todo.completed;
          }

          if (todoStatus === 'completed') {
            return todo.completed;
          }

          return true;
        });
      })
      .then(setTodos)
      .finally(() => setLoading(false));
  }, [todoStatus, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onSelect={setTodoStatus}
                onQueryChange={setQuery}
                onClear={() => setQuery('')}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={todos}
                selectedTodo={selectedTodo}
                showTodo={todo => setSelectedTodo(todo)}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={() => setSelectedTodo(undefined)}
        />
      )}
    </>
  );
};
