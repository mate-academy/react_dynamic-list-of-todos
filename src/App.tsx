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
import { Status } from './types/Status';

interface Options {
  [key: string]: string;
}

const prepareTodos = (todos: Todo[], options: Options): Todo[] => {
  const { query, filterStatus } = options;
  let todosCopy = [...todos];

  if (query) {
    todosCopy = todosCopy.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (filterStatus) {
    todosCopy = todosCopy.filter(todo => {
      switch (filterStatus) {
        case Status.Active: {
          return !todo.completed;
        }

        case Status.Completed: {
          return todo.completed;
        }

        default:
          return true;
      }
    });
  }

  return todosCopy;
};

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState(Status.All);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodosFromServer)
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = prepareTodos(todosFromServer, { query, filterStatus });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChanged={setQuery}
                filterStatus={filterStatus}
                onStatusChanged={setFilterStatus}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  todoID={selectedTodo?.id}
                  onTodoSelected={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onTodoReset={setSelectedTodo} />
      )}
    </>
  );
};
