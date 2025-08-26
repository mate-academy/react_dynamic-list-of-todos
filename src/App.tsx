import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';

export const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [userError, setUserError] = useState<string | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showError, setShowError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [chosenFilter, setChosenFilter] = useState('all');

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await getTodos();

        setTodos(data);
      } catch {
        setShowError('Loading Failed!');
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  const handleOpenMod = async (todo: Todo) => {
    if (!todo) return;

    setSelectedTodo(todo);
    setIsModalOpen(true);

    setUser(null);
    setUserError(null);
    setIsUserLoading(true);

    try {
      const fetchedUser = await getUser(todo.userId);
      setUser(fetchedUser);
    } catch {
      setUserError('Failed to load user');
    } finally {
      setIsUserLoading(false);
    }
  };

  const handeCloseMod = () => {
    setIsModalOpen(false);
    setSelectedTodo(null);
  };

  const enableTitle = () => {
    setQuery('');
  };

  const getVisibleTodos = (
    todosList: Todo[],
    queryFilter: string,
    chosenFilt: string,
  ): Todo[] => {
    let visibleTodos = [...todosList];

    if (queryFilter.trim() !== '') {
      visibleTodos = visibleTodos.filter(todo =>
        todo.title.toLowerCase().includes(queryFilter.toLowerCase().trim()),
      );
    }

    if (chosenFilt === 'completed') {
      visibleTodos = visibleTodos.filter(todo => todo.completed === true);
    }

    if (chosenFilt === 'active') {
      visibleTodos = visibleTodos.filter(todo => todo.completed === false);
    }

    return visibleTodos;
  };

  const visibleTodos = useMemo(() => {
    return getVisibleTodos(todos, query, chosenFilter);
  }, [todos, query, chosenFilter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                enableTitle={enableTitle}
                setQuery={setQuery}
                query={query}
                chosenFilter={chosenFilter}
                setChosenFilter={setChosenFilter}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  openMod={handleOpenMod}
                  selectedTodo={selectedTodo}
                />
              )}
              {showError && <p className="error">{showError}</p>}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && selectedTodo && (
        <TodoModal
          closeMod={handeCloseMod}
          todo={selectedTodo}
          user={user}
          isUserLoading={isUserLoading}
          userError={userError}
        />
      )}
    </>
  );
};
