/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { TodoModal } from './components/TodoModal';
import { User } from './types/User';

function filterTodos(query: string, todos: Todo[]): Todo[] {
  return todos.filter(todo => {
    const fixedQuery = query.toLowerCase().trim();
    const fixedName = todo.title.toLowerCase();

    return fixedName.includes(fixedQuery);
  });
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  useEffect(() => {
    if (!selectedTodo) {
      return;
    }

    setIsLoadingUser(true);

    getUser(selectedTodo.userId)
      .then(setSelectedUser)
      .finally(() => setIsLoadingUser(false));
  }, [selectedTodo]);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={setQuery}
                onTodosChange={setTodos}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={filterTodos(query, todos)}
                onChangeSelectedTodo={setSelectedTodo}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (isLoadingUser || selectedUser) && (
        <TodoModal
          isLoadingUser={isLoadingUser}
          selectedTodo={selectedTodo}
          selectedUser={selectedUser}
          onChangeSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
