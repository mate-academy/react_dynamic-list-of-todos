import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  useMemo,
} from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { TodosContext } from './TodosContext';
import { Todo } from './types/Todo';
import { Sort } from './types/Sort';

const ERROR_MESSAGE_TODOS = 'Failed to load todos, please try again later';

export const App: React.FC = () => {
  const {
    sortMode,
    isTodoModal,
  } = useContext(TodosContext);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoadins, setIsLoading] = useState(true);
  const [querry, setQuerry] = useState('');
  const [todosError, setTodosError] = useState('');

  const getWantedTodos = useCallback((todo: Todo) => {
    return todo.title.toLowerCase().includes(querry.trim().toLowerCase());
  }, [querry]);

  function getVisibleTodos(type: Sort) {
    switch (type) {
      case Sort.All:
        return todos
          .filter(getWantedTodos);

      case Sort.Active:
        return todos
          .filter(todo => !todo.completed)
          .filter(getWantedTodos);

      case Sort.Completed:
        return todos
          .filter(todo => todo.completed)
          .filter(getWantedTodos);

      default:
        return todos;
    }
  }

  useEffect(() => {
    getTodos()
      .then(todosData => {
        setTodos(todosData);
      })
      .catch(() => {
        setTodosError(ERROR_MESSAGE_TODOS);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const visibleTodos: Todo[] = useMemo(() => {
    return getVisibleTodos(sortMode);
  }, [sortMode, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter querry={querry} onQuerry={setQuerry} />
            </div>

            <div className="block">
              {isLoadins && !todosError && <Loader />}

              {!isLoadins && !todosError && (
                <TodoList list={visibleTodos} />
              )}

              {todosError && (
                <p className="error">{todosError}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {isTodoModal && <TodoModal />}
    </>
  );
};
