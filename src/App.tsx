import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoStatus } from './types/TodoStatus';
import { filterTodoList } from './utils/functions';

export const App: React.FC = () => {
  const [todosList, setTodosList] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState(TodoStatus.All);
  const [query, setQuery] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [error, setError] = useState('');

  const filteredTodos = filterTodoList(todosList, query, filter);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodosList)
      .catch((err) => {
        // Display an error message on the UI
        // eslint-disable-next-line no-console
        console.error('An error occurred:', err);
        // You can also set a state variable to display the error message
        setError('An error occurred while fetching data.');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const selectedTodo = todosList.find((todo) => todo.id === selectedTodoId);

  return (
    <>
      {error && <div className="message-header">{error}</div>}
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                setFilter={setFilter}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                filteredTodos={filteredTodos}
                setSelectedTodoId={setSelectedTodoId}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodoId={setSelectedTodoId}
        />
      )}
    </>
  );
};
