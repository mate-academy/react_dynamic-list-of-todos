import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { FilterType } from './types/Todo';

const filterTodos = (todos: Todo[], query: string, filter: FilterType) => {
  return todos.filter((todo) => {
    if (query && !todo.title.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }

    switch (filter) {
      case 'completed':
        return todo.completed;
      case 'active':
        return !todo.completed;
      default:
        return true;
    }
  });
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<FilterType>('all');
  const [query, setQuery] = useState<string>('');

  const handleToDoClick = (userId: number) => {
    setIsUserLoading(true);
    getUser(userId).then((userData: User) => {
      setUser(userData);
      setIsUserLoading(false);
    }).catch(() => {
      setIsUserLoading(false);
    });
  };

  const handleClearQuery = () => {
    setQuery('');
  };

  useEffect(() => {
    setIsLoading(true);
    getTodos().then((data: Todo[]) => {
      setTodos(data);
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    });
  }, []);

  const handleShowClick = (todo: Todo) => {
    setSelectedTodo(todo);
    handleToDoClick(todo.userId);
  };

  const filteredTodos = filterTodos(todos, query, filter);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block">
              <TodoFilter
                setFilter={setFilter}
                query={query}
                setQuery={setQuery}
                handleClearQuery={handleClearQuery}
              />
            </div>
            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodos}
                    onShowClick={handleShowClick}
                    selectedTodo={selectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          isUserLoading={isUserLoading}
          user={user}
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
