/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos, getUser } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { User } from './types/User';
import { getFilteredTodos } from './utils/getFilteredTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filteredStatus, setFilteredStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadTodos = () => {
      getTodos().then((res) => {
        setTodos(res)
        setIsLoading(false)
      });
    };

    loadTodos();
  }, []);

  const handleShowTodo = (todo: Todo) => {
    setIsLoading(true);
    setSelectedTodo(todo);
    getUser(todo.userId).then((res) => setUser(res));

    setIsLoading(false);
  };

  const handleHideTodo = () => {
    setSelectedTodo(null);
    setUser(null);
  };

  const filteredTodos = getFilteredTodos(todos, filteredStatus, searchQuery);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filteredStatus={filteredStatus}
                setFilteredStatus={setFilteredStatus}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodo ? selectedTodo.id : null}
                  onShowTodo={handleShowTodo}
                  onHideTodo={handleHideTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} user={user} onClose={handleHideTodo} />
      )}
    </>
  );
};
