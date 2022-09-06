import { useEffect, useState } from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';

import { Todo } from './types/Todo';
import { FilterStatus } from './types/FilterStatus';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [initialized, setInitialized] = useState(false);
  const [
    filterByStatus,
    setFilterByStatus,
  ] = useState<FilterStatus>(FilterStatus.ALL);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .then(() => setInitialized(true));
  }, []);

  useEffect(() => {
    switch (filterByStatus) {
      case FilterStatus.COMPLETE:
        setVisibleTodos(todos.filter(todo => todo.completed));
        break;
      case FilterStatus.ACTIVE:
        setVisibleTodos(todos.filter(todo => !todo.completed));
        break;
      case FilterStatus.ALL:
      default:
        setVisibleTodos(todos);
    }
  }, [todos, filterByStatus]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterByStatus={filterByStatus}
                setFilterByStatus={setFilterByStatus}
              />
            </div>

            <div className="block">
              {!initialized ? (
                <Loader />
              ) : (
                <TodoList todos={visibleTodos} />
              )}
            </div>
          </div>
        </div>
      </div>

      {false && <TodoModal />}
    </>
  );
};
