import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';
import { TodoStatus } from './types/TodoStatus';
import { User } from './types/User';

const getFilteredTodos = (filter: TodoStatus, query: string) => {
  return getTodos().then(todos => {
    let filteredTodos = todos;

    switch (filter) {
      case TodoStatus.All:
        break;

      case TodoStatus.Active:
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;

      case TodoStatus.Complited:
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;

      default: throw new Error('Wrong todo status');
    }

    if (query) {
      const lowerQuery = query.toLowerCase().trim();

      filteredTodos = filteredTodos.filter(({ title }) => (
        title.toLowerCase().includes(lowerQuery)
      ));
    }

    return filteredTodos;
  });
};

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [modalUser, setModalUser] = useState<User | null>(null);
  const [todoStatusFilter, setTodoStatusFilter] = useState(TodoStatus.All);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const onTodoModalClose = () => {
    setSelectedTodoId(0);
  };

  useEffect(() => {
    setError(false);
    setLoading(true);

    getFilteredTodos(todoStatusFilter, query)
      .then(todos => setVisibleTodos(todos))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [todoStatusFilter, query]);

  useEffect(() => {
    const selectedTodo = visibleTodos.find(todo => todo.id === selectedTodoId);

    if (selectedTodo) {
      getUser(selectedTodo.userId)
        .then(user => {
          setModalUser(user);
        });
    }
  }, [selectedTodoId]);

  const selectedTodo = selectedTodoId
    ? visibleTodos.find(todo => todo.id === selectedTodoId)
    : null;

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
                todoStatusFilter={todoStatusFilter}
                setTodoStatusFilter={setTodoStatusFilter}
              />
            </div>

            <div className="block">
              {error && 'Error on loading data from server'}

              {!isLoading && !error
                ? (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodoId={selectedTodoId}
                    setSelectedTodoId={setSelectedTodoId}
                  />
                )
                : <Loader /> }
            </div>
          </div>
        </div>
      </div>
      {(selectedTodo && modalUser) && (
        <TodoModal
          todo={selectedTodo}
          user={modalUser}
          handleClosing={onTodoModalClose}
        />
      )}
    </>
  );
};
