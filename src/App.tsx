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
    isOpenModal,
    todos,
    inputField,
    filteredBy,
  } = useContext(TodoContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const preparedTodos = useMemo(() => getPreparedTodos(todos, {
    inputField,
    filteredBy,
  }), [inputField, filteredBy, todos]);

  const isShowTodoList = Boolean(preparedTodos.length) && !isLoading;

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

              {isShowTodoList && (
                <TodoList todos={preparedTodos} />
              )}
            </div>
          </div>
        </div>
      </div>

      {isOpenModal && (
        <TodoModal />
      )}
    </>
  );
};
