/* eslint-disable max-len */
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useEffect, useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

enum Status {
  all = 'All',
  active = 'Active',
  completed = 'Completed',
}

export const App: React.FC = () => {
  const [isTodos, setIsTodos] = useState<Todo[]>([]);
  const [isLoadingTodos, setIsLoadingTodos] = useState(false);
  const [hasQuery, setHasQuery] = useState('');
  const [isSelectedTodo, setIsSelectedTodo] = useState<Todo | null>(null);
  const [hasStatus, setHasStatus] = useState('All');

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHasStatus(e.target.value);
  };

  const filteredTodos = isTodos.filter(todo =>
    todo.title.toLowerCase().includes(hasQuery.toLowerCase()),
  );

  const filteredTodosByStatus = filteredTodos.filter(todo => {
    switch (hasStatus) {
      case Status.all:
        return true;

      case Status.active:
        return todo.completed === false;

      case Status.completed:
        return todo.completed === true;

      default:
        return true;
    }
  });

  const handleClear = () => {
    setIsSelectedTodo(null);
    setHasQuery('');
  };

  useEffect(() => {
    setIsLoadingTodos(true);

    getTodos()
      .then(setIsTodos)
      .finally(() => setIsLoadingTodos(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onQueryChange={setHasQuery}
                onClear={handleClear}
                hasQuery={hasQuery}
                onStatusChange={handleStatusChange}
                hasStatus={hasStatus}
              />
            </div>

            <div className="block">
              {isLoadingTodos && <Loader />}
              <TodoList
                isTodos={filteredTodosByStatus}
                onShowModal={setIsSelectedTodo}
                selectedTodo={isSelectedTodo}
              />
            </div>
          </div>
        </div>
      </div>
      {isSelectedTodo && (
        <TodoModal onClear={handleClear} todo={isSelectedTodo} />
      )}
    </>
  );
};
