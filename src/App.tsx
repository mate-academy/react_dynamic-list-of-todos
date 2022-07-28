/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<Status>('all');

  useEffect(() => {
    getTodos()
      .then(setTodosFromServer)
      .then(() => setIsLoaded(true));
  }, []);

  const visibleTodos = todosFromServer.filter(todo => {
    const preparedQuery = query.toLocaleLowerCase();
    const preparedTitle = todo.title.toLocaleLowerCase();

    switch (status) {
      case 'active':
        return !todo.completed
          && preparedTitle
            .includes(preparedQuery);
      case 'completed':
        return todo.completed
          && preparedTitle
            .includes(preparedQuery);

      default:
        return preparedTitle
          .includes(preparedQuery);
    }
  });

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
                setStatus={setStatus}
              />
            </div>

            <div className="block">
              {!isLoaded
                ? (<Loader />)
                : (
                  <TodoList
                    todos={visibleTodos}
                    onSelectedTodo={setSelectedTodo}
                    selectedTodo={selectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
