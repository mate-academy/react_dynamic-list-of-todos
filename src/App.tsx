/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [field, setField] = useState('all');
  const [query, setQuery] = useState('');

  async function getTodosFromServer() {
    const todosFromAPI = await getTodos();

    setTodos(todosFromAPI);
  }

  useEffect(() => {
    getTodosFromServer();
  }, []);

  async function selectUser(todoId: number) {
    const filteredTodos = todos.filter(todo => todo.id === todoId);
    const { userId } = filteredTodos[0];
    const userFromServer = await getUser(userId);

    setSelectedUser(userFromServer);
  }

  const selectTodo = (todoId: number) => {
    const filteredTodos = todos.filter(todo => todo.id === todoId);

    setSelectedTodo(filteredTodos[0]);
    selectUser(todoId);
  };

  const resetTodo = () => {
    setSelectedTodo(null);
    setSelectedUser(null);
  };

  const filteredTodos = todos
    .filter(todo => {
      switch (field) {
        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;
          break;

        default:
          return true;
      }
    })
    .filter(todo => todo.title.toLowerCase()
      .includes(query.toLowerCase()));

  const resetSearch = () => {
    setQuery('');
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setField={setField}
                setQuery={setQuery}
                query={query}
                resetSearch={resetSearch}
              />
            </div>

            <div className="block">
              {todos.length === 0 && <Loader />}
              <TodoList
                todos={filteredTodos}
                selectTodo={selectTodo}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          selectedUser={selectedUser}
          resetTodo={resetTodo}
        />
      )}
    </>
  );
};
