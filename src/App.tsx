/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [ddOption, setDDOption] = useState('all');
  const [query, setQuery] = useState('');
  const [error, setError] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo>({} as Todo);
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    getTodos()
      .then(resolve => {
        setTodos(resolve);
        setShowLoader(false);
      })
      .catch(() => {
        setError(true);
        setShowLoader(false);
      });

    if (selectedTodo.userId) {
      getUser(selectedTodo.userId)
        .then(resolve => {
          setUser(resolve);
          setShowLoader(false);
        })
        .catch(() => {
          setError(true);
          setShowLoader(false);
        });
    } else {
      setUser({} as User);
    }
  }, [selectedTodo]);

  const filteredTodos = (): Todo[] => {
    let ddFilter: Todo[] = todos;

    if (ddOption === 'active') {
      ddFilter = todos.filter(todo => todo.completed === false);
    } else if (ddOption === 'completed') {
      ddFilter = todos.filter(todo => todo.completed === true);
    }

    return ddFilter.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                ddOption={ddOption}
                setDDOption={setDDOption}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {(showLoader && todos.length >= 0) && <Loader />}
              {todos.length > 0 && !error && (
                <TodoList
                  todos={filteredTodos()}
                  selectedTodo={selectedTodo}
                  onSelected={setSelectedTodo}
                  setShowLoader={setShowLoader}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo.id && (
        <TodoModal
          showLoader={showLoader}
          setShowLoader={setShowLoader}
          todo={selectedTodo}
          onClose={setSelectedTodo}
          user={user}
        />
      )}
    </>
  );
};
