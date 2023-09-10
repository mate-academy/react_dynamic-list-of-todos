import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Status } from './utils/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loaderIsShown, setLoaderIsShown] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [todosStatus, setTodosStatus] = useState(Status.ALL);
  const [query, setQuery] = useState('');

  setTimeout(() => {
    setLoaderIsShown(false);
  }, 300);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        let filteredTodos = todosFromServer;

        switch (todosStatus) {
          case Status.ACTIVE:
            filteredTodos = filteredTodos.filter(todo => !todo.completed);
            break;

          case Status.COMPLETED:
            filteredTodos = filteredTodos.filter(todo => todo.completed);
            break;

          default:
            filteredTodos = [...filteredTodos];
        }

        const lowerQuery = query.toLowerCase();

        filteredTodos = filteredTodos.filter(
          todo => todo.title.toLowerCase().includes(lowerQuery),
        );

        setTodos(filteredTodos);
      });
  }, [todos, todosStatus, query]);

  const handleClick = async (todo: Todo) => {
    setSelectedTodo(todo);

    const currentUser = await getUser(todo.userId);

    setUser(currentUser);
  };

  const closeWindow = () => {
    setSelectedTodo(null);
  };

  const clearQuery = () => {
    setQuery('');
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleChange={setTodosStatus}
                queryChange={setQuery}
                clearQuery={clearQuery}
                query={query}
              />
            </div>

            <div className="block">
              {loaderIsShown
                ? (
                  <Loader />
                ) : (
                  <TodoList
                    todos={todos}
                    selectedId={selectedTodo?.id}
                    handleClick={handleClick}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          user={user}
          todo={selectedTodo}
          closeWindow={closeWindow}
        />
      )}
    </>
  );
};
