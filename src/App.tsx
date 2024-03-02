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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadingTodos, setLoadingTodos] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [status, setStatus] = useState('');

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(query),
  );

  const filteredTodosByStatus = filteredTodos.filter(todo => {
    if (status === 'all') {
      return true;
    }

    if (status === 'active') {
      return todo.completed === false;
    }

    if (status === 'completed') {
      return todo.completed === true;
    }

    return true;
  });

  const handleAllTodos = (input: string) => {
    setQuery(input.toLowerCase());
  };

  const handleClear = () => {
    setSelectedTodo(null);
    setQuery('');
  };

  const handleShowModal = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  useEffect(() => {
    setLoadingTodos(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoadingTodos(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onQueryChange={handleAllTodos}
                onClear={handleClear}
                query={query}
                onStatusChange={handleStatusChange}
                status={status}
              />
            </div>

            <div className="block">
              {loadingTodos && <Loader />}
              <TodoList
                todos={filteredTodosByStatus}
                onShowModal={handleShowModal}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && <TodoModal onClear={handleClear} todo={selectedTodo} />}
    </>
  );
};
