/* eslint-disable max-len */
import {
  FC, useCallback, useEffect, useMemo, useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './app.scss';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { Maybe } from './types/Maybe';
import { FilterType } from './types/FilterType';
import { getTodos } from './api';
import { debounce } from './decorator';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Maybe<Todo>>(null);
  const [filterType, setFilterType] = useState(FilterType.All);
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(todosFromServer => setTodos(todosFromServer))
      .finally(() => setIsLoading(false));
  }, []);

  const applyQuery = useCallback(debounce(setAppliedQuery, 500), []);
  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const checkQuery = todo.title.toLowerCase().includes(query.toLowerCase());

      switch (filterType) {
        case FilterType.All:
          return checkQuery;
        case FilterType.Active:
          return checkQuery && !todo.completed;
        case FilterType.Completed:
          return checkQuery && todo.completed;
        default:
          return true;
      }
    });
  }, [todos, appliedQuery, filterType]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterType={filterType}
                onFilterChange={setFilterType}
                searchQuery={query}
                onChange={setQuery}
                onAppliedChange={applyQuery}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodo?.id || null}
                  selectTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={setSelectedTodo}
        />
      )}
    </>
  );
};
