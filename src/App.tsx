/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(false);

  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('all');

  useEffect(() => {
    getTodos()
      .then(data => setTodos(data))
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!selectedTodo) {
      setUser(null);

      return;
    }

    setUserLoading(true);

    getUser(selectedTodo.userId)
      .then(dataUser => setUser(dataUser))
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
      })
      .finally(() => {
        setUserLoading(false);
      });
  }, [selectedTodo]);

  const handleCloseModal = () => {
    setSelectedTodo(null);
  };

  const filteredTodos = useMemo(() => {
    return todos.filter(t => {
      const inputName = inputValue.toLowerCase().trim();

      if (selectValue === 'all') {
        return t.title.toLowerCase().includes(inputName);
      }

      if (selectValue === 'active') {
        return t.title.toLowerCase().includes(inputName) && !t.completed;
      }

      if (selectValue === 'completed') {
        return t.title.toLowerCase().includes(inputName) && t.completed;
      }

      return false;
    });
  }, [todos, inputValue, selectValue]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                inputValue={inputValue}
                onInputChange={setInputValue}
                selectValue={selectValue}
                onStatusChange={setSelectValue}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  selectedTodo={selectedTodo}
                  onSelectTodo={setSelectedTodo}
                  todos={filteredTodos}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          onClose={handleCloseModal}
          user={user}
          todo={selectedTodo}
          loading={userLoading}
        />
      )}
    </>
  );
};
