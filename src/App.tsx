/* eslint-disable max-len */
import React, {
  useCallback,
  useEffect,
  useMemo,
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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoadTodo, setIsLoadTodo] = useState(false);
  const [selectTodo, setSelectTodo] = useState<Todo | null>(null);
  const [filterType, setFilterType] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(todo => {
        setTodos(todo);
        setIsLoadTodo(true);
      });
  }, []);

  const filterTodo = useMemo(() => {
    return todos.filter(todo => {
      const todosFilter = todo.title.toLowerCase().includes(query.toLowerCase());

      switch (filterType) {
        case 'all':
          return todosFilter;

        case 'completed':
          return todo.completed && todosFilter;

        case 'active':
          return !todo.completed && todosFilter;

        default:
          return todosFilter;
      }
    });
  }, [query, todos, filterType]);

  const onChangeQuery = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  const resetQuery = useCallback(() => {
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
                resetQuery={resetQuery}
                setFilterType={setFilterType}
                filterType={filterType}
              />
            </div>

            <div className="block">
              {isLoadTodo
                ? (
                  <TodoList
                    selectTodo={selectTodo}
                    setSelectTodo={setSelectTodo}
                    todos={filterTodo}
                  />
                )
                : (
                  <Loader />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectTodo && (
        <TodoModal
          selectTodo={selectTodo}
          setSelectTodo={setSelectTodo}
        />
      )}
    </>
  );
};
