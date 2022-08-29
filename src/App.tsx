/* eslint-disable max-len */
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

const getFilteredTodos = (
  givenTodos: Todo[],
  filterVariant: string,
  searchQuery: string,
) => {
  const basicTodos = [...givenTodos].filter(todo => (
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  ));

  switch (filterVariant) {
    case 'completed':
      return basicTodos.filter(todo => todo.completed);
    case 'active':
      return basicTodos.filter(todo => !(todo.completed));
    default:
      return basicTodos;
  }
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const [filterVariant, setFilterVariant] = useState('all');

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then((todo) => {
        setTodos(todo);
        setIsLoading(false);
      });
  }, []);

  const getFilter = (option: string) => {
    return setFilterVariant(option);
  };

  const getQuery = useCallback((newQuery) => {
    setQuery(newQuery);
  }, [setQuery]);

  const handleSelect = useCallback((todoId: number | null) => {
    setSelectedTodoId(todoId);
  }, [setSelectedTodoId]);

  const filteredTodos = useMemo(() => {
    return getFilteredTodos(todos, filterVariant, query);
  }, [todos, filterVariant, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSearch={getQuery}
                query={query}
                onFilter={getFilter}
                filterVariant={filterVariant}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {todos.length > 0
                && (
                  <TodoList
                    todos={filteredTodos}
                    selectedTodoId={selectedTodoId}
                    onSelect={handleSelect}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId
        && (
          <TodoModal
            todos={filteredTodos}
            selectedTodoId={selectedTodoId}
            onSelect={handleSelect}
          />
        )}
    </>
  );
};
