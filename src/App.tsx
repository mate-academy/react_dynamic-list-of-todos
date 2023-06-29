/* eslint-disable max-len */
import { FC, useState, useEffect } from 'react';
import './App.scss';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { LoadingError } from './components/LoadingError';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasLoadingError, setHasLoadingError] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  async function fetchTodos() {
    setIsLoading(true);

    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setHasLoadingError(true);
    }
  }

  const filteredTodos = todos.filter(todo => {
    const title = todo.title.toLowerCase();
    const search = searchQuery.toLowerCase().trim();

    return title.includes(search);
  });

  const filteredTodosByOption = filteredTodos.filter(todo => {
    switch (selectedOption) {
      case 'all':
        return todo;
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return todo;
    }
  });

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
            </div>

            <div className="block">
              {/* eslint-disable-next-line no-nested-ternary */}
              {isLoading ? (
                <Loader />
              ) : (
                // create a new component called LoadingError
                // if the request fails, render the LoadingError component
                // that will display a message and a button to retry
                hasLoadingError ? (
                  <LoadingError
                    loading={isLoading}
                    loadTodos={() => fetchTodos}
                  />
                ) : (
                  <TodoList
                    todos={filteredTodosByOption}
                    setSelectedTodo={setSelectedTodo}
                    selectedTodo={selectedTodo}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          setTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
