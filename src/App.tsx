/* eslint-disable max-len */
import { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<string>(Status.ALL);

  const visibleTodos = todos.filter(todo => {
    switch (status) {
      case Status.Active:
        return !todo.completed && todo.title.toLowerCase().trim().includes(query.toLowerCase().trim());

      case Status.Completed:
        return todo.completed && todo.title.toLowerCase().trim().includes(query.toLowerCase().trim());

      case Status.ALL:
      default:
        return todo.title.toLowerCase().trim().includes(query.toLowerCase().trim());
    }
  });

  const getTodoFromServer = useCallback(async () => {
    const todoFromServer = await getTodos();

    setTodos(todoFromServer);
  }, []);

  useEffect(() => {
    getTodoFromServer();
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
              {!visibleTodos.length && (
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
