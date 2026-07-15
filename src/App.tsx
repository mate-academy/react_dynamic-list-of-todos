/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';

export type TodoStatus = 'all' | 'active' | 'completed';

export type TodoDetails = {
  id: number;
  title: string;
  isCompleted: boolean;
  userName: string;
  userEmail: string;
};

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoDetails, setSelectedTodoDetails] =
    useState<TodoDetails | null>(null);

  const [status, setStatus] = useState<TodoStatus>('all');
  const [query, setQuery] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleSelectTodo = (selectedTodo: Todo) => {
    setSelectedTodoDetails(null);
    setIsModalOpen(true);
    setIsLoading(true);

    getUser(selectedTodo.userId)
      .then(user => {
        setSelectedTodoDetails({
          id: selectedTodo.id,
          title: selectedTodo.title,
          isCompleted: selectedTodo.completed,
          userName: user.name,
          userEmail: user.email,
        });
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTodoDetails(null);
  };

  const visibleTodos = todos.filter(todo => {
    const matchesStatus =
      status === 'all' ||
      (status === 'completed' && todo.completed) ||
      (status === 'active' && !todo.completed);

    const normalizedQuery = query.trim().toLowerCase();
    const matchesQuery = todo.title.toLowerCase().includes(normalizedQuery);

    return matchesStatus && matchesQuery;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                query={query}
                setStatus={setStatus}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {todos.length === 0 && isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  selectedTodoId={selectedTodoDetails?.id ?? null}
                  todos={visibleTodos}
                  handleSelectTodo={handleSelectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TodoModal
          selectedTodo={selectedTodoDetails}
          isLoading={isLoading}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
