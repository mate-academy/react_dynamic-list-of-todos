/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { FilterBy, Todo } from './types/Todo';
import { User } from './types/User';
import { filterGoods } from './todo/todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.ALL);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then((todosData: Todo[]) => {
        setTodos(todosData);
      })
      .catch(() => setErrorMessage('Try again later'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedTodoId) {
      setSelectedTodo(null);

      return;
    }

    const openedTodo = todos.find(todo => todo.id === selectedTodoId);

    if (openedTodo?.userId) {
      setLoading(true);

      getUser(openedTodo.userId)
        .then((userData: User) => {
          const user = userData as User;

          setSelectedTodo({
            ...openedTodo,
            user: user || null,
          });
        })
        .catch(() => setErrorMessage('Try again later'))
        .finally(() => setLoading(false));
    }
  }, [selectedTodoId]);

  const preparedTodos = filterGoods(todos, filterBy, query);
  const isShowTodoList = (!loading || (loading && selectedTodoId))
    && (!errorMessage && todos.length > 0);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterBy={filterBy}
                onFilterChange={setFilterBy}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading && !selectedTodoId && <Loader />}
              {isShowTodoList && (
                <TodoList
                  todos={preparedTodos}
                  onTodoClick={(todoId) => setSelectedTodoId(todoId)}
                  selectedTodo={selectedTodo}
                />
              )}

              {errorMessage && (
                <p className="has-text-danger">{errorMessage}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId && (
        <TodoModal
          todo={selectedTodo}
          isLoading={loading}
          setSelectedTodoId={(todoId) => setSelectedTodoId(todoId)}
        />
      )}
    </>
  );
};
