/* eslint-disable max-len */
import React, {
  useEffect,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { User } from './types/User';

function getFilteredTodos(
  todos: Todo[],
  query: string,
  sortBy: string,
) {
  let filteredTodos = todos;

  if (query.length > 0) {
    filteredTodos = filteredTodos.filter(todo => (
      todo.title.toLowerCase().includes(query.toLowerCase())
    ));
  }

  switch (sortBy) {
    case 'all':
      return filteredTodos;

    case 'active':
      return filteredTodos.filter(todo => todo.completed === false);

    case 'completed':
      return filteredTodos.filter(todo => todo.completed === true);

    default:
      return filteredTodos;
  }
}

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [query, setQuery] = useState('');
  const [appliedQuery, setApliedQuery] = useState('');
  const [status, setStatus] = useState('All');

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = getFilteredTodos(todos, appliedQuery, status);

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
                setApliedQuery={setApliedQuery}
                status={status}
                setStatus={setStatus}
              />
            </div>

            <div className="block">
              {loading
                ? <Loader />
                : (
                  <TodoList
                    setLoading={setLoading}
                    todos={filteredTodos}
                    setSelectedTodo={setSelectedTodo}
                    selectedTodo={selectedTodo}
                    setUser={setUser}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          loading={loading}
          setSelectedTodo={setSelectedTodo}
          selectedTodo={selectedTodo}
          user={user}
        />
      )}
    </>
  );
};
