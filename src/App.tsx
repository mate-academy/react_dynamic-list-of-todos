import React, { useState, useEffect } from 'react';
import { getTodos, getUser } from './api';
import { TodosList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { User } from './types/User';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const loadTodos = async () => {
      setLoading(true);
      const data = await getTodos();

      setTodos(data);
      setFilteredTodos(data);
      setLoading(false);
    };

    loadTodos();
  }, []);

  const handleShowTodo = async (todo: Todo | null) => {
    if (!todo) {
      setSelectedTodo(null);
      setUserDetails(null);

      return;
    }

    setSelectedTodo(todo);
    setModalLoading(true);
    try {
      const user = await getUser(todo.userId);

      setUserDetails(user);
    } catch (error) {
      return error;
    } finally {
      setModalLoading(false);
    }
  };

  const handleFilterChange = (status: string) => {
    setFilter(status);

    const filtered = todos.filter(todo => {
      if (status === 'all') {
        return true;
      }

      return status === 'completed' ? todo.completed : !todo.completed;
    });

    setFilteredTodos(
      filtered.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      ),
    );
  };

  const handleSearch = (text: string) => {
    setQuery(text);

    if (text === '') {
      const filtered = todos.filter(todo => {
        if (filter === 'all') {
          return true;
        }

        return filter === 'completed' ? todo.completed : !todo.completed;
      });

      setFilteredTodos(filtered);

      return;
    }

    const filtered = todos.filter(todo => {
      const matchesStatus =
        filter === 'all' ||
        (filter === 'completed' ? todo.completed : !todo.completed);

      return (
        matchesStatus && todo.title.toLowerCase().includes(text.toLowerCase())
      );
    });

    setFilteredTodos(filtered);
  };

  return (
    <div>
      <h1>Todo App</h1>
      {loading && <Loader />}
      {!loading && (
        <>
          <TodoFilter
            query={query}
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
          />
          <TodosList
            todos={filteredTodos}
            onShowTodo={handleShowTodo}
            selectedTodo={selectedTodo}
          />
        </>
      )}
      {selectedTodo && (
        <div data-cy="modal">
          {modalLoading ? (
            <Loader data-cy="modal-loader" />
          ) : (
            userDetails && (
              <TodoModal
                todo={selectedTodo}
                user={userDetails}
                onClose={() => handleShowTodo(null)}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default App;
