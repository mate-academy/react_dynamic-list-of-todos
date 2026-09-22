/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { getTodos } from './api';
import { getUser } from './api';
import { FilterStatus } from './types/FilterStatus';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isTodosLoading, setTodosLoading] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null); // Modal state
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false);
  const [filterTodo, setFilterTodo] = useState<FilterStatus>('all');
  const [inputQuery, setInputQuery] = useState<string>('');

  const handleTodoItemClick = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleCloseTodoModal = () => {
    setSelectedTodo(null);
  };

  // FILTER TODOS

  const visibleTodos: Todo[] = todos.filter((todo: Todo) => {
    const matchesQuery = todo.title
      .toLowerCase()
      .includes(inputQuery.toLowerCase());

    let matchesFilter = true;

    if (filterTodo === 'completed') {
      matchesFilter = todo.completed;
    }

    if (filterTodo === 'active') {
      matchesFilter = !todo.completed;
    }

    return matchesFilter && matchesQuery;
  });

  // GET TODOS

  useEffect(() => {
    setTodosLoading(true);
    getTodos()
      .then(newTodos => {
        setTodos(newTodos);
        setTodosLoading(false);
      })
      .catch(() => {})
      .finally(() => {
        setTodosLoading(false);
      });
  }, []);

  // FIND USER

  useEffect(() => {
    if (!selectedTodo) {
      return;
    }

    setIsUserLoading(true);

    getUser(selectedTodo.userId)
      .then(setSelectedUser)
      .catch(() => {})
      .finally(() => {
        setIsUserLoading(false);
      });
  }, [selectedTodo]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilterTodo={setFilterTodo}
                inputQuery={inputQuery}
                onChangeQuery={setInputQuery}
              />
            </div>

            <div className="block">
              {isTodosLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  onTodoItemClick={handleTodoItemClick}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          selectedUser={selectedUser}
          isUserLoading={isUserLoading}
          onCloseTodoModal={handleCloseTodoModal}
        />
      )}
    </>
  );
};
