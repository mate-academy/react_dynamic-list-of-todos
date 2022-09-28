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
  filterType: string,
  query: string,
) {
  const filterBy = todos.filter((todo) => {
    switch (filterType) {
      case 'completed':
        return todo.completed;

      case 'active':
        return !todo.completed;

      default:
        return todo;
    }
  });

  return filterBy.filter(({ title }) => (
    title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  ));
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedTodo, setSelectedTodo] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredBy, setFilteredBy] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const getTodosFromServer = async () => {
      const receivedTodos = await getTodos();

      setTodos(receivedTodos);
      setIsLoading(false);
    };

    getTodosFromServer();
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
                setQuery={setQuery}
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
                    selectedTodo={setSelectedTodo}
                    selectedUserId={setSelectedUserId}
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
            selectedTodo={setSelectedTodo}
            selectedUserId={setSelectedUserId}
          />
        )}
    </>
  );
};
