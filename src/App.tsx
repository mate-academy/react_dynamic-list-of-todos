/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Filters } from './types/Filters';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsloading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<Filters>(Filters.All);

  const closeModal = () => {
    setSelectedTodo(null);
  };

  const filterTodos = () => {
    let filteredTodos = todos;

    if (status === Filters.Completed) {
      filteredTodos = todos.filter(todo => todo.completed);
    }

    if (status === Filters.Active) {
      filteredTodos = todos.filter(todo => !todo.completed);
    }

    return filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  };

  useEffect(() => {
    getTodos()
      .then(data => {
        setTodos(data);
      })
      .finally(() => {
        setIsloading(false);
      });
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
                setQuery={setQuery}
                setStatus={setStatus}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : todos.length ? (
                <TodoList
                  todos={filterTodos()}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
              ) : (
                <p>No data</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} closeModal={closeModal} />
      )}
    </>
  );
};
