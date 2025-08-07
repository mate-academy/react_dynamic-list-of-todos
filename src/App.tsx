import React, { useState, useEffect } from 'react';
import { getTodos } from './api';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<
    'all' | 'active' | 'completed'
  >('all');

  const filteredTodos = todos.filter(todo => {
    const matchesQuery = searchQuery
      ? todo.title.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'completed' && todo.completed) ||
      (filterStatus === 'active' && !todo.completed);

    return matchesQuery && matchesStatus;
  });

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    getTodos()
      .then(todosData => {
        setTodos(todosData);
        setIsLoading(false);
      })
      .catch(() => {
        setError('Failed to load todos');
        setIsLoading(false);
      });
  }, []);

  function handleSelectTodo(todo: Todo) {
    if (selectedTodo?.id === todo.id) {
      setIsModalActive(false);
      setSelectedTodo(null);
    } else {
      setIsModalActive(true);
      setSelectedTodo(todo);
    }
  }

  function handleCloseModal() {
    setIsModalActive(false);
    setSelectedTodo(null);
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <TodoFilter
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
            />
            <div className="block">
              {error ? (
                <p className="has-text-danger">{error}</p>
              ) : isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onSelectTodo={handleSelectTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {isModalActive && (
        <TodoModal selectedTodo={selectedTodo} onClose={handleCloseModal} />
      )}
    </>
  );
};
