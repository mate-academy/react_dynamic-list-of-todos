/* eslint-disable max-len */
import React, {
  useState,
  useEffect,
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
import { FilterBy } from './types/typedefs';
import { getTodosByFilter } from './helpers';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filterTodos, setFilterTodos] = useState(FilterBy.ALL);

  const handleSelectingTodo = useCallback((todo: Todo) => {
    setSelectedTodo(todo);
  }, []);

  const handleQuery = useCallback((userQuery: string) => {
    setQuery(userQuery);
  }, []);

  const handleFilterTodos = useCallback((userFilter) => {
    setFilterTodos(userFilter);
  }, []);

  const prepareTodos = useMemo(() => {
    let visibleTodos = [...todos];

    if (filterTodos) {
      visibleTodos = getTodosByFilter(visibleTodos, filterTodos);
    }

    if (query) {
      visibleTodos = visibleTodos.filter(({ title }) => title.toLowerCase().includes(query.toLowerCase()));
    }

    return visibleTodos;
  }, [filterTodos, query, todos]);

  useEffect(() => {
    getTodos().then(setTodos);
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
                todos={filterTodos}
                onChange={handleQuery}
                onSelect={handleFilterTodos}
              />
            </div>

            <div className="block">
              {todos.length
                ? (
                  <TodoList
                    todos={prepareTodos}
                    selectedTodoId={selectedTodo?.id}
                    onSelectedTodo={handleSelectingTodo}
                  />
                )
                : <Loader />}
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
