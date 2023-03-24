import React, {
  useMemo, useState, useEffect,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Filter } from './Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [query, setQuery] = useState('');
  const [isTodosLoaded, setIsTodosLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [filterType, setFilterType] = useState<string>(Filter.All);

  const todoFilter = useMemo(() => {
    const cleanQuerty = todos
      .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

    return cleanQuerty.filter(todo => {
      switch (filterType) {
        case Filter.Active:
          return !todo.completed;

        case Filter.Completed:
          return todo.completed;

        default:
          return todo;
      }
    });
  }, [todos, query, filterType]);

  useEffect(() => {
    setIsTodosLoaded(true);
    getTodos()
      .then(setTodos)
      .catch(() => setHasError(true))
      .finally(() => setIsTodosLoaded(false));
  }, []);

  const selectedTodo = useMemo(() => {
    return todos.find(todo => todo.id === selectedTodoId);
  }, [selectedTodoId, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                filterType={filterType}
                setQuery={setQuery}
                setFilterType={setFilterType}
              />
            </div>

            <div className="block">
              {!isTodosLoaded
                ? (
                  <TodoList
                    selectedTodo={selectedTodoId}
                    onSelect={setSelectedTodoId}
                    todos={todoFilter}
                  />
                ) : (
                  <Loader />
                )}

              {hasError && (
                <p className='has-text-danger'>
                  Error:
                  {hasError}
                </p>
              )}

              {(query && !todoFilter.length) && (
                <p className='has-text-danger'>No todos matched filters</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectTodo={selectedTodo}
          closeModalWin={setSelectedTodoId}
        />
      ) }
    </>
  );
};
