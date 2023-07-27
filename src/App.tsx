/* eslint-disable max-len */
import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

enum SortType {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [todo, setTodos] = useState<Todo[]>([]);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [sortType, setSortType] = useState(SortType.ALL);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const getPreparedTodos = useCallback((
    currentTodos: Todo[],
  ) => {
    let sortedTodos: Todo[] = [];

    switch (sortType) {
      case SortType.ALL:
        sortedTodos = [...currentTodos];
        break;

      case SortType.ACTIVE:
        sortedTodos = currentTodos.filter(todos => !todos.completed);
        break;

      case SortType.COMPLETED:
        sortedTodos = currentTodos.filter(todos => todos.completed);
        break;

      default:
        throw new Error('Wrong sort type');
    }

    return sortedTodos.filter(todos => todos.title.toLowerCase().includes(inputValue));
  }, [inputValue, sortType]);

  const preparedTodos = getPreparedTodos(todo);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                value={inputValue}
                setValue={setInputValue}
                setSortType={setSortType}
              />
            </div>

            <div className="block">
              {(loading && !preparedTodos.length && <Loader />)
                || (
                  <TodoList
                    todos={preparedTodos}
                    setShowModal={setShowModal}
                    setLoading={setLoading}
                    setUser={setUser}
                    setCurrentTodo={setCurrentTodo}
                    showModal={showModal}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <TodoModal
          setShowModal={setShowModal}
          loading={loading}
          user={user}
          todo={currentTodo}
        />
      )}
    </>
  );
};
