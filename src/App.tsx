/* eslint-disable max-len */
import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { TodoModal } from './components/TodoModal';
import { User } from './types/User';

const FilterStatus = {
  ALL: 'all',
  COMPLETED: 'completed',
  ACTIVE: 'active',
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState(FilterStatus.ALL);
  const [query, setQuery] = useState('');

  const handleTodoClick = (todo: Todo) => {
    setIsLoading(true);
    setSelectedTodo(todo);

    getUser(todo.userId)
      .then((user) => {
        setSelectedUser(user);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        throw new Error(error);
      });
  };

  const filteredTodos = useMemo(() => {
    let filteredTodosArr = [...todos];

    switch (filterStatus) {
      case FilterStatus.COMPLETED:
        filteredTodosArr = filteredTodosArr.filter((todo) => todo.completed);
        break;
      case FilterStatus.ACTIVE:
        filteredTodosArr = filteredTodosArr.filter((todo) => !todo.completed);
        break;
      default:
        break;
    }

    if (query) {
      filteredTodosArr = filteredTodosArr.filter((todo) => (
        todo.title.toLowerCase().includes(query.toLowerCase())
      ));
    }

    return filteredTodosArr;
  }, [todos, filterStatus, query]);

  const handleModalClose = useCallback(() => {
    setSelectedTodo(null);
  }, [setSelectedTodo]);

  const handleFilterSelect = (filter: string) => {
    setFilterStatus(filter);
  };

  const handleQueryChange = (queryStr: string) => {
    setQuery(queryStr);
  };

  const handleQueryReset = () => {
    setQuery('');
  };

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then((todo) => {
        setTodos(todo);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        throw new Error(error);
      });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedFilter={filterStatus}
                onFilterSelect={handleFilterSelect}
                onQueryChange={handleQueryChange}
                onQueryReset={handleQueryReset}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodos}
                    onTodoClick={handleTodoClick}
                    selectedTodo={selectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          selectedUser={selectedUser}
          onClose={handleModalClose}
          isLoading={isLoading}
        />
      )}
    </>
  );
};
