/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
// import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Status } from './types/Status';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState(Status.All);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const visibleTodos = todos.filter(todo => {
    const validTodo = (completed: boolean) => {
      return todo.completed === completed && todo.title.includes(query);
    };

    switch (status) {
      case Status.Completed:
        return validTodo(true);
      case Status.Active:
        return validTodo(false);
      default:
        return todo && todo.title.includes(query);
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
                changeStatus={setStatus}
                changeQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {
                isLoading ? (
                  <Loader />
                ) : (
                  <TodoList
                    todos={visibleTodos}
                    changeTodo={setSelectedTodo}
                    selectedTodo={selectedTodo}
                  />
                )
              }
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          changeTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
