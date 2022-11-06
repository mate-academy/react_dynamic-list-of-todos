import React, { useState, useEffect } from 'react';
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [status, setStatus] = useState<Status>(Status.All);
  const [query, setQuery] = useState('');

  const getAllTodos = async () => {
    const todosLoaded = await getTodos();

    setTodos(todosLoaded);
    setIsLoaded(true);
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  const selectTodo = (id: number) => {
    setSelectedId(id);
  };

  const selectedTodo = todos.find(todo => todo.id === selectedId) || null;

  const getFilteredTodos = () => (
    todos.filter(todo => {
      const titleNormalized = todo.title.toLowerCase();
      const queryNormalized = query.toLowerCase();

      return titleNormalized.includes(queryNormalized);
    }).filter(todo => {
      switch (status) {
        case Status.Completed:
          return todo.completed;

        case Status.Active:
          return !todo.completed;

        case Status.All:
        default:
          return todo;
      }
    })
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                setStatus={setStatus}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {!isLoaded
                ? <Loader />
                : (
                  <TodoList
                    todos={getFilteredTodos()}
                    selectedId={selectedId}
                    selectTodo={selectTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {selectedId
        && (
          <TodoModal
            todo={selectedTodo}
            selectTodo={selectTodo}
          />
        )}
    </>
  );
};
