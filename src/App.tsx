/* eslint-disable max-len */
import {
  FC,
  useState,
  useEffect,
  useMemo,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Statuses } from './types/Statuses';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [areTodosLoaded, setAreTodosLoaded] = useState<boolean>(false);
  const [status, setStatus] = useState(Statuses.All);
  const [query, setQuery] = useState<string>('');

  const visibleTodos = useMemo(() => {
    const filteredTodos = todos.filter(({ title }) => (
      title
        .toLowerCase()
        .includes(query.toLowerCase())
    ));

    return filteredTodos.filter(({ completed }) => {
      switch (status) {
        case Statuses.Active:
          return !completed;

        case Statuses.Completed:
          return completed;

        default:
          return true;
      }
    });
  }, [todos, status, query]);

  const handleModalClose = () => {
    setSelectedTodo(null);
  };

  useEffect(() => {
    getTodos()
      .then((fetchTodos: Todo[]) => {
        setTodos(fetchTodos);
        setAreTodosLoaded(true);
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
                status={status}
                query={query}
                onStatusChange={setStatus}
                onQueryChange={setQuery}
              />
            </div>

            <div className="block">
              {!areTodosLoaded && <Loader />}

              {areTodosLoaded && (
                visibleTodos.length
                  ? (
                    <TodoList
                      todos={visibleTodos}
                      selectedTodo={selectedTodo}
                      onSelectedTodo={setSelectedTodo}
                    />
                  )
                  : (
                    <p>
                      No data with this words...
                    </p>
                  )
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={handleModalClose}
        />
      )}
    </>
  );
};
