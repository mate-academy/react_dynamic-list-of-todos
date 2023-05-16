import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { TodoFilter } from './components/TodoFilter';
import { FilterValues } from './types/FilterValues';

import { getTodos, getUser } from './api';

import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isTodosLoaded, setIsTodosLoaded] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [isModalLoaded, setIsModalLoaded] = useState(false);
  const [filterValue, setFilterValue]
    = useState(FilterValues.All);
  const [query, setQuery] = useState('');
  const [hasLoadingError, setHasLoadingError] = useState(false);

  const filterTodos = () => {
    switch (filterValue) {
      case FilterValues.All:
        return todos;

      case FilterValues.Active:
        return todos.filter(todo => todo.completed);

      case FilterValues.Completed:
        return todos.filter(todo => !todo.completed);

      default:
        return todos;
    }
  };

  const getVisibleTodos = () => {
    return filterTodos().filter(
      todo => todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  };

  const visibleTodos = useMemo(
    getVisibleTodos,
    [todos, filterValue, query],
  );

  const getTodosfromServer = useCallback(() => {
    getTodos().then((result: Todo[]) => {
      setTodos(result);
    }).catch(() => {
      setHasLoadingError(true);
    }).finally(() => {
      setIsTodosLoaded(true);
    });
  }, []);

  const handleLoadAgain = useCallback(() => {
    setIsTodosLoaded(false);
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      getUser(selectedUserId)
        .then((user: User) => {
          setSelectedUser(user);
          setIsModalLoaded(true);
        });
    }

    setIsModalLoaded(false);
  }, [selectedUserId]);

  const handleSelectUser = (userId: number, todo: Todo | null) => {
    setSelectedUserId(userId);
    setSelectedTodo(todo);
  };

  const handleFilterValue = (value: FilterValues) => {
    setFilterValue(value);
  };

  const handleInputValue = (value: string) => {
    setQuery(value);
  };

  useEffect(() => {
    getTodosfromServer();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectValue={filterValue}
                onChangeSelect={handleFilterValue}
                inputValue={query}
                onChangeInput={handleInputValue}
              />
            </div>

            <div className="block">
              {!isTodosLoaded
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    onSelect={handleSelectUser}
                    hasLoadingError={hasLoadingError}
                    onAgain={handleLoadAgain}
                    selectedTodo={selectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedUserId > 0 && (
        <TodoModal
          user={selectedUser}
          todo={selectedTodo}
          onClose={handleSelectUser}
          loadModal={isModalLoaded}
        />
      )}
    </>
  );
};
