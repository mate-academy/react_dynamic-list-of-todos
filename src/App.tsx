import { useEffect, useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Nullable } from './types/Nullable';
import { Todo } from './types/Todo';
import { FilterOption } from './types/FilterOption';
import { filterTodo } from './utils/filterTodo';
import { getTodos } from './api';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<Nullable<string>>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<FilterOption>(
    FilterOption.ALL,
  );

  const [selectedTodo, setSelectedTodo] = useState<Nullable<Todo>>(null);

  const visibleTodos = filterTodo(todos, { query, statusFilter });

  const handleOpenModal = (todo: Todo) => setSelectedTodo(todo);

  const handleCloseModal = () => setSelectedTodo(null);

  useEffect(() => {
    setErrorMessage(null);
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Failed to load Todos'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={setQuery}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {errorMessage ? (
                    <p className="has-text-danger">{errorMessage}</p>
                  ) : (
                    <TodoList
                      todos={visibleTodos}
                      selectedTodoId={selectedTodo?.id}
                      onOpenModal={handleOpenModal}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onCloseModal={handleCloseModal} />
      )}
    </>
  );
};
