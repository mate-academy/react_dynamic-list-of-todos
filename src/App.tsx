/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
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
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todoStatus, setTodoStatus] = useState('all');
  const [query, setQuery] = useState('');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => setTodos(todosFromServer));
  }, []);

  const showInfo = async (id: number, todo: Todo) => {
    setSelectedTodo(todo);
    setUser(await getUser(id));
  };

  const closeInfo = () => {
    setSelectedTodo(null);
    setUser(null);
  };

  const getQuery = (text: string) => {
    setQuery(text);
  };

  const getStatusedTodos = (choosedTodoStatus: string) => {
    setTodoStatus(choosedTodoStatus);
  };

  let filteredTodos = todos.filter(todo => {
    switch (todoStatus) {
      case 'all':
        return todo;

      case 'active':
        return !todo.completed;

      case 'completed':
        return todo.completed;

      default:
        throw new Error('Incorrect todoStatus');
    }
  });

  filteredTodos = filteredTodos.filter(todo => {
    const normalizedQuery = query.toLocaleLowerCase();
    const normalizedTitle = todo.title.toLocaleLowerCase();

    return (
      normalizedTitle.includes(normalizedQuery)
    );
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onGetStatusTodos={getStatusedTodos}
                onGetQuery={getQuery}
                query={query}
              />
            </div>

            <div className="block">
              {!todos.length
                ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodos}
                    onShowInfo={showInfo}
                    selectedTodo={selectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          user={user}
          todo={selectedTodo}
          onCloseInfo={closeInfo}
        />
      )}
    </>
  );
};
