/* eslint-disable max-len */
import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';
import { Status } from './types/status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);

  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [status, setStatus] = useState(Status.All);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  const selectedTodo = useMemo(() => {
    return todos.find(todo => todo.id === selectedTodoId);
  }, [todos, selectedTodoId]);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(data => {
        setTodos(data);
        setFilteredTodos(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  const currentTodos = useMemo(() => {
    let tempTodos = todos;

    switch (status) {
      case Status.Completed:
        tempTodos = todos.filter(todo => todo.completed);
        break;
      case Status.Active:
        tempTodos = todos.filter(todo => !todo.completed);
        break;
      default:
        tempTodos = todos;
        break;
    }

    if (searchQuery) {
      tempTodos = tempTodos.filter(
        todo => todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    return tempTodos;
  }, [todos, status, searchQuery]);

  useEffect(() => {
    setFilteredTodos(currentTodos);
    getUser(selectedUserId)
      .then(setSelectedUser);
  }, [currentTodos, selectedUserId]);

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
                  selectedTodoId={selectedTodoId}
                  setSelectedTodoId={setSelectedTodoId}
                  setSelectedUserId={setSelectedUserId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          setSelectedTodoId={setSelectedTodoId}
          user={selectedUser}
          todo={selectedTodo}
        />
      )}

    </>
  );
};
