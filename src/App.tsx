/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';

export function filteredTodo(
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
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(0);
  const [selectedTodo, setSelectedTodo] = useState(0);
  const [filteredBy, setFilteredBy] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const todosFromServer = async () => {
      const getedTodos = await getTodos();

      setTodos(getedTodos);
      setIsLoading(false);
    };

    todosFromServer();
  }, []);

  const filteredTodos = filteredTodo(todos, filteredBy, query);

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
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodos}
                    selectedTodo={setSelectedTodo}
                    selectedTodoId={selectedTodo}
                    selectedUserId={setUserId}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo
      && (
        <TodoModal
          userId={userId}
          selectedTodoId={selectedTodo}
          selectedTodo={setSelectedTodo}
          selectedUserId={setUserId}
        />
      )}
    </>
  );
};
