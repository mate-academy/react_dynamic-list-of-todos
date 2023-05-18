/* eslint-disable max-len */
import {
  FC,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';
import { Filter } from './types/Filter';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);
  const [filterBy, setFilterBy] = useState<Filter>(Filter.All);
  const [query, setQuery] = useState<string>('');

  const loadTodos = useCallback(async () => {
    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
    } catch {
      setHasError(true);
    }
  }, []);

  const handleShowModal = (userId: number, todo: Todo) => {
    setIsModalShown(true);
    getUser(userId).then(userFromServer => {
      setSelectedUser(userFromServer);
    });
    setSelectedTodo(todo);
  };

  const handleHideModal = () => {
    setIsModalShown(false);
    setSelectedUser(null);
    setSelectedTodo(null);
  };

  const filterTodos = useMemo(() => {
    return todos.filter(todo => {
      const formattedQuery = query.trim().toLowerCase();
      const matchesQuery = todo.title.toLowerCase().includes(formattedQuery);

      switch (filterBy) {
        case Filter.Completed:
          return matchesQuery && todo.completed;

        case Filter.Active:
          return matchesQuery && !todo.completed;

        case Filter.All:
        default:
          return matchesQuery;
      }
    });
  }, [todos, filterBy, query]);

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterBy={filterBy}
                onSelect={setFilterBy}
                query={query}
                onChange={setQuery}
              />
            </div>

            <div className="block">
              {hasError && (
                <p className="has-text-danger">
                  Loading error, try again
                </p>
              )}
              {(todos.length > 0)
                ? (
                  <TodoList
                    todos={filterTodos}
                    selectedTodo={selectedTodo}
                    showModal={handleShowModal}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {isModalShown && (
        <TodoModal
          selectedTodo={selectedTodo}
          selectedUser={selectedUser}
          onClose={handleHideModal}
        />
      )}
    </>
  );
};
