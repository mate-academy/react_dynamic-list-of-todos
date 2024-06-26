import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { getTodos } from './api';
import { FilterTypes } from './types/filterTypes';
import { filterTodos } from './components/TodoFilter/filteredTodos';

export interface TodoWithUser extends Todo {
  user: User;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FilterTypes>(FilterTypes.All);
  const [selectedTodoWithUser, setSelectedTodoWithUser] =
    useState<TodoWithUser | null>(null);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(loadedTodos => {
        setTodos(loadedTodos);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleShowTodo = () => {
    setLoadingUser(true);
    setSelectedTodoWithUser(null);
  };

  const handleCloseModal = () => {
    setLoadingUser(true);
    setSelectedTodoWithUser(null);

    setLoadingUser(false);
  };

  const visibleTodos = filterTodos(query, filter, todos);

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
                filter={filter}
                onFilterChange={setFilter}
              />
            </div>
            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  onShowTodo={handleShowTodo}
                  selectedTodoId={
                    selectedTodoWithUser ? selectedTodoWithUser.id : null
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodoWithUser || loadingUser ? (
        <TodoModal
          todoWithUser={selectedTodoWithUser}
          onClose={handleCloseModal}
        />
      ) : null}
    </>
  );
};
