/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  const visibleTodos = todos.filter(todo => {
    enum Status {
      ALL = 'all',
      Completed = 'completed',
      Active = 'active',
    }

    switch (status) {
      case Status.Active:
        return !todo.completed && todo.title.toLowerCase().includes(query.toLowerCase());

      case Status.Completed:
        return todo.completed && todo.title.toLowerCase().includes(query.toLowerCase());

      case Status.ALL:
      default:
        return todo.title.toLowerCase().includes(query.toLowerCase());
    }
  });

  useEffect(() => {
    getTodos()
      .then(todoFromServer => setTodos(todoFromServer));
  }, []);

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
                status={status}
                onSetStatus={setStatus}
              />
            </div>

            <div className="block">
              {visibleTodos.length === 0 && (
                <Loader />
              )}
              <TodoList
                todos={visibleTodos}
                selectedTodo={selectedTodo}
                onSetSelectedTodo={setSelectedTodo}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onSetSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
