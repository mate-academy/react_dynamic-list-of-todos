import React, { useState, useEffect } from 'react';
import { getTodos, getUserDetails } from './api/api';
import { Todo } from './api/types';
import TodoList from './components/TodoList';
import Loader from './components/Loader';
import TodoFilter from './components/TodoFilter';
import TodoModal from './components/TodoModal';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [filterBy, setFilterBy] = useState<'all' | 'completed' | 'active'>('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTodos = async () => {
      setIsLoading(true);
      try {
        const loadedTodos = await getTodos();
        setTodos(loadedTodos);
        setVisibleTodos(loadedTodos);
      } catch (err) {
        setError('Failed to load todos.');
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, []);

  const handleQueryChange = (query: string) => {
    setQuery(query);
    setVisibleTodos(
      todos.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()))
    );
  };

  const handleFilterChange = (filterBy: 'all' | 'completed' | 'active') => {
    setFilterBy(filterBy);
    setVisibleTodos(
      todos.filter(todo =>
        filterBy === 'completed' ? todo.completed : filterBy === 'active' ? !todo.completed : true
      )
    );
  };

  const openModal = async (todo: Todo) => {
    setIsLoading(true);
    try {
      const user = await getUserDetails(todo.userId);
      setSelectedTodo({ ...todo, user });
    } catch {
      setError('Failed to load user details.');
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedTodo(null);
  };

  return (
    <div>
      <h1>Todo List</h1>
      {isLoading && <Loader />}
      {error && <div className="notification">{error} <button onClick={() => setError(null)}>x</button></div>}
      <TodoFilter query={query} filterBy={filterBy} onQueryChange={handleQueryChange} onFilterChange={handleFilterChange} />
      <TodoList todos={visibleTodos} onShow={openModal} />
      {selectedTodo && <TodoModal todo={selectedTodo} onClose={closeModal} />}
    </div>
  );
};

export default App;
