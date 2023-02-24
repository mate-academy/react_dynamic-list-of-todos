import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { prepareTodo } from './utils/helper';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [todosFilter, setTodosFilter] = useState<Filter>(Filter.ALL);

  const visibleTodos = useMemo(() => (
    prepareTodo(todos, searchQuery, todosFilter)
  ), [todos, searchQuery, todosFilter]);

  const selectedTodo
    = visibleTodos.find(todo => todo.id === selectedTodoId) || null;

  const clearSelectedTodo = useCallback(() => {
    setSelectedTodoId(0);
  }, []);

  const changeSearchQuery = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const changeTodosFilter = useCallback((filter: Filter) => {
    setTodosFilter(filter);
  }, []);

  const loadTodos = useCallback(async () => {
    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
      setIsDataLoading(false);
    } catch (error) {
      setIsLoadingError(true);
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, []);

  if (isLoadingError) {
    return (
      <h1>Server is unavailable, try again later...</h1>
    );
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchQuery={searchQuery}
                todosFilter={todosFilter}
                onSearchQueryChange={changeSearchQuery}
                onTodosFilterChange={changeTodosFilter}
              />
            </div>
            {isDataLoading
              ? <Loader />
              : (
                <div className="block">
                  <TodoList
                    todos={visibleTodos}
                    onTodoSelected={setSelectedTodoId}
                    selectedTodoId={selectedTodoId}
                  />
                </div>
              )}
          </div>
        </div>
      </div>
      {selectedTodoId
        && (
          <TodoModal
            todo={selectedTodo}
            clearSelectedTodo={clearSelectedTodo}
          />
        )}
    </>
  );
};
