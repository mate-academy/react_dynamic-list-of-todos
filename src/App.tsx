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
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Status } from './enum/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>(Status.All);

  useEffect(() => {
    getTodos().then((data) => {
      setTodos(data);
    });
  }, []);

  const handleSelectingTodo = useCallback((todo: Todo) => {
    setSelectedTodo(todo);
  }, []);

  const filterTodos = () => {
    let preparedTodos = [...todos];

    if (query) {
      preparedTodos = preparedTodos.filter((todo) => (
        todo.title.toLowerCase().includes(query.toLowerCase())
      ));
    }

    switch (filterStatus) {
      case Status.Active:
        preparedTodos = preparedTodos.filter((todo) => !todo.completed);
        break;

      case Status.Completed:
        preparedTodos = preparedTodos.filter((todo) => todo.completed);
        break;

      case Status.All:
      default:
        return preparedTodos;
    }

    return preparedTodos;
  };

  const visibleTodos = useMemo(filterTodos, [todos, filterStatus, query]);

  const handleFilterSelect = useCallback((filter: string) => {
    setFilterStatus(filter);
  }, []);

  const handleQueryChange = useCallback((queryStr: string) => {
    setQuery(queryStr);
  }, []);

  const handleReset = useCallback(() => {
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
                selectedFilter={filterStatus}
                onFilterSelect={handleFilterSelect}
                onQueryChange={handleQueryChange}
                onQueryReset={handleReset}
                query={query}
              />
            </div>

            <div className="block">
              {todos.length
                ? (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodoId={selectedTodo?.id}
                    onSelectTodo={handleSelectingTodo}
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
