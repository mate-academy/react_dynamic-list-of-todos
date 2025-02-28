import React, { useEffect, useState } from 'react';
import { getTodos, getUser } from './api';
import TodoList from './components/TodoList/TodoList';
import TodoFilter from './components/TodoFilter/TodoFilter';
import TodoModal from './components/TodoModal/TodoModal';
import Loader from './components/Loader/Loader';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface User {
  id: number;
  name: string;
}

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [query, setQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const userId = localStorage.getItem('userId') || '1';
  // Функція фільтрації
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const filterTodos = (status: string, query: string) => {
    let filtered = todos;

    if (status === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    } else if (status === 'active') {
      filtered = filtered.filter(todo => !todo.completed);
    }

    if (query) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    setFilteredTodos(filtered);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const todosData = await getTodos();

        setTodos(todosData);
        setFilteredTodos(todosData);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching todos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const userData = await getUser(Number(userId));

        setUser(userData);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleFilterByTitle = (newQuery: string) => {
    setQuery(newQuery);
    filterTodos(statusFilter, newQuery);
  };

  const handleFilterByStatus = (status: string) => {
    setStatusFilter(status);
    filterTodos(status, query);
  };

  const handleShowTodoModal = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
  };

  return (
    <div>
      {loading ? <Loader /> : null}

      {user && <h1>Welcome, {user.name}</h1>}

      <TodoFilter
        onFilterByTitle={handleFilterByTitle}
        onFilterByStatus={handleFilterByStatus}
        query={query}
      />

      <TodoList todos={filteredTodos} onShowTodoModal={handleShowTodoModal} />

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
