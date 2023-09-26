import {
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { getTodos } from './api';

import { TodoContext } from './context/ContextTodo';

import { TodoFilter, getPreparedTodos } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { TodoList } from './components/TodoList';
import { Loader } from './components/Loader';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

export const App: FC = () => {
  const {
    setTodos,
    selectedTodo,
    todos,
    inputField,
    filteredBy,
  } = useContext(TodoContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(error => {
        // eslint-disable-next-line no-console
        console.warn(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const preparedTodos = useMemo(() => getPreparedTodos(todos, {
    inputField,
    filteredBy,
  }), [inputField, filteredBy, todos]);

  const isTodoListVisible = Boolean(preparedTodos.length) && !isLoading;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {isLoading && <Loader />}

              {isTodoListVisible && (
                <TodoList todos={preparedTodos} />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal />
      )}
    </>
  );
};
