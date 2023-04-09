/* eslint-disable max-len */
import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [todosLoaded, setTodosLoaded] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterOption, setFilterOption] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(todos => {
        setVisibleTodos(todos);
        setTodosLoaded(true);
      });
  }, []);

  const filteredTodos = useMemo(() => {
    return visibleTodos.filter(todo => {
      const filterByQuery = todo.title.toLowerCase().includes(query.toLowerCase());

      switch (filterOption) {
        case 'all':
          return filterByQuery;

        case 'active':
          return !todo.completed && filterByQuery;

        case 'completed':
          return todo.completed && filterByQuery;

        default:
          return filterByQuery;
      }
    });
  }, [query, visibleTodos, filterOption]);

  const onChangeQuery = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }, []);

  const reset = useCallback(() => {
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
                onChangeQuery={onChangeQuery}
                filterOption={filterOption}
                setFilterOption={setFilterOption}
                resetQuery={reset}
              />
            </div>

            <div className="block">
              {todosLoaded
                ? (
                  <TodoList
                    todos={filteredTodos}
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
