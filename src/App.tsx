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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filteredStatus, setFilteredStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadTodos = async () => {
      const fetchedTodos = await getTodos();

      setTodos(fetchedTodos);
      setIsLoading(false);
    };

    loadTodos();
  }, []);

  const handleShowTodo = async (todo: Todo) => {
    setIsLoading(true);
    setSelectedTodoId(todo.id);
    setSelectedTodo(todo);
    const fetchedUser = await getUser(todo.userId);

    setUser(fetchedUser);
    setIsLoading(false);
  };

  const handleHideTodo = () => {
    setSelectedTodoId(null);
    setSelectedTodo(null);
    setUser(null);
  };

  const filteredTodos = todos
    .filter(todo => {
      if (filteredStatus === 'completed') {
        return todo.completed;
      }

      if (filteredStatus === 'active') {
        return !todo.completed;
      }

      return true;
    })
    .filter(todo =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase().trimStart()),
    );

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
              {isLoading && <Loader />}
              <TodoList
                todos={filteredTodos}
                selectedTodoId={selectedTodoId}
                onShowTodo={handleShowTodo}
                onHideTodo={handleHideTodo}
              />
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
