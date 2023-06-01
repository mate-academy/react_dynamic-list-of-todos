/* eslint-disable max-len */
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredBy, setFilteredBy] = useState('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  // const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos()
      .then((todosFromServer) => setTodos(todosFromServer));
  }, []);

  const handleFilteredByChange = useMemo(() => {
    return todos.filter((todo) => {
      const queryFilter = todo.title.toLowerCase().includes(query.toLowerCase());

      switch (filteredBy) {
        case 'all':
          return queryFilter;
        case 'completed':
          return todo.completed && queryFilter;
        case 'active':
          return !todo.completed && queryFilter;
        default:
          return queryFilter;
      }
    });
  }, [todos, filteredBy, query]);

  const handleQueryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    }, [],
  );

  const handleQueryReset = useCallback(() => {
    setQuery('');
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                filteredBy={filteredBy}
                setFilteredBy={setFilteredBy}
                handleQueryChange={handleQueryChange}
                handleQueryReset={handleQueryReset}
              />
            </div>

            <div className="block">
              {todos.length ? (
                <TodoList
                  todos={handleFilteredByChange}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}

    </>
  );
};
