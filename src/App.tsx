/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export function getFilteredTodo(
  todos: Todo[],
  filterTypeTodo: string,
  query: string,
) {
  const filterTodoBy = todos.filter((todo) => {
    switch (filterTypeTodo) {
      case 'all':
        return todo;

      case 'completed':
        return todo.completed === true;

      case 'active':
        return todo.completed === false;

      default:
        return 0;
    }
  });

  return filterTodoBy.filter(({ title }) => (
    title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  ));
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedTodo, setSelectedTodo] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredBy, setFilteredBy] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(todo => setTodos(todo))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = getFilteredTodo(todos, filteredBy, query);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilteredBy={setFilteredBy}
                setQuery={(queryInput) => {
                  setQuery(queryInput);
                }}
                filteredBy={filteredBy}
                query={query}
              />
            </div>

            <div className="block">

              { isLoading
                ? <Loader />
                : (
                  <TodoList
                    todo={filteredTodos}
                    selectedTodoId={selectedTodo}
                    selectedTodo={(id) => {
                      setSelectedTodo(id);
                    }}
                    selectedUserId={(userId) => {
                      setSelectedUserId(userId);
                    }}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo
        && (
          <TodoModal
            userId={selectedUserId}
            selectedTodoId={selectedTodo}
            selectedTodo={(id) => {
              setSelectedTodo(id);
            }}
            selectedUserId={(userId) => {
              setSelectedUserId(userId);
            }}
          />
        )}
    </>
  );
};
