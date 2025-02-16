import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTodoId, setSelectedTodoId] = useState<number | undefined>(
    undefined,
  );
  const [filter, setFilter] = useState<string>('');
  const [status, setStatus] = useState<string>('all');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const fetchedTodos = await getTodos();

        setTodos(fetchedTodos);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleTodoSelect = (todo: Todo) => {
    if (selectedTodoId === todo.id) {
      setSelectedTodoId(undefined);
    } else {
      setSelectedTodoId(todo.id);
    }
  };

  const handleFilterUpdate = (value: string) => {
    setFilter(value);
  };

  const handleStatusSelect = (value: string) => {
    setStatus(value);
  };

  const handleFilterClear = () => {
    setFilter('');
  };

  const filteredTodos = todos.filter(todo => {
    const matchesQuery = todo.title
      .toLowerCase()
      .includes(filter.toLowerCase());
    const matchesStatus =
      status === 'all' ||
      (status === 'active' && !todo.completed) ||
      (status === 'completed' && todo.completed);

    return matchesQuery && matchesStatus;
  });

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                onFilterChange={handleFilterUpdate}
                status={status}
                onStatusChange={handleStatusSelect}
                onClear={handleFilterClear}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  handleShow={handleTodoSelect}
                  selectedTodoId={selectedTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          handleClose={() => setSelectedTodoId(undefined)}
        />
      )}
    </>
  );
};

export default App;
