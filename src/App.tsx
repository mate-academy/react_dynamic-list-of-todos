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
  const [todoLoading, setTodoLoading] = useState(false);

  const [filterStatus, setFilterStatus] = useState('all');
  const [query, setQuery] = useState('');

  const [todoModalLoading, setTodoModalLoading] = useState(false);
  const [idModalForTodo, setIdModalForTodo] = useState(-1);
  const [user, setUser] = useState<User>();

  const filteredTodos = todos
    .filter(el => {
      switch (filterStatus) {
        case 'active':
          return !el.completed;
        case 'completed':
          return el.completed;
        default:
          return true;
      }
    })
    .filter(({ title }) => title.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    setTodoLoading(true);
    getTodos()
      .then(todosList => setTodos(todosList))
      .finally(() => setTodoLoading(false));
  }, []);

  const findTodo = (todoId = idModalForTodo) => {
    return todos.find(el => el.id === todoId) as Todo;
  };

  const openModal = (id: number) => {
    setIdModalForTodo(id);
    setTodoModalLoading(true);
    getUser(findTodo(id).userId)
      .then(foundUser => setUser(foundUser))
      .finally(() => setTodoModalLoading(false));
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                updateStatus={event =>
                  setFilterStatus(event.currentTarget.value)
                }
                updateQuery={value => setQuery(value)}
                query={query}
              />
            </div>

            <div className="block">
              {todoLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  openModal={openModal}
                  idModalForTodo={idModalForTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {idModalForTodo !== -1 && (
        <TodoModal
          loading={todoModalLoading}
          todo={findTodo()}
          closeModal={() => setIdModalForTodo(-1)}
          user={user}
        />
      )}
    </>
  );
};
