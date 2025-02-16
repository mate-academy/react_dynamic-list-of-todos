import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [isLoadingTodos, setIsLoadingTodos] = useState<boolean>(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadTodos = async () => {
      setIsLoadingTodos(true);
      try {
        const todosData = await getTodos();

        setTodos(todosData);
        setFilteredTodos(todosData);
      } catch (error) {
      } finally {
        setIsLoadingTodos(false);
      }
    };

    loadTodos();
  }, []);

  useEffect(() => {
    if (selectedTodo) {
      setIsLoadingUser(true);
      try {
        const fetchUser = async () => {
          const userData = await getUser(selectedTodo.userId);

          setUser(userData);
        };

        fetchUser();
      } catch (error) {
      } finally {
        setIsLoadingUser(false);
      }
    }
  }, [selectedTodo]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    filterTodos();
  }, [query, statusFilter, todos]);

  const filterTodos = () => {
    let updatedTodos = [...todos];

    if (query) {
      updatedTodos = updatedTodos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (statusFilter !== 'all') {
      const isCompleted = statusFilter === 'completed';

      updatedTodos = updatedTodos.filter(
        todo => todo.completed === isCompleted,
      );
    }

    setFilteredTodos(updatedTodos);
  };

  const handleShowTodo = (todo: Todo | null) => {
    setSelectedTodo(todo);
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
              />
            </div>

            <div className="block">
              {isLoadingTodos ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onShowTodo={handleShowTodo}
                  selectedTodoId={selectedTodo ? selectedTodo.id : null}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={handleCloseModal}
          isLoadingUser={isLoadingUser}
          user={user}
        />
      )}
    </>
  );
};

export default App;
