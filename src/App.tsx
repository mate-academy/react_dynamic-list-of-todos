/* eslint-disable max-len */
import React, {
  useState, useEffect, useMemo, useCallback,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getFilteredTodos } from './helpers';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    getTodos()
      .then(setTodos);
  }, []);

  const visibleTodos = useMemo(() => (
    getFilteredTodos(todos, filter, searchQuery)
  ), [todos, filter, searchQuery]);

  const selectTodoId = useCallback((todoId: number) => setSelectedTodoId(todoId), []);

  const selectedTodo = useMemo(() => (
    visibleTodos.find(todo => (
      todo.id === selectedTodoId
    ))
  ), [selectedTodoId, visibleTodos]);

  const selectValue = useCallback((value: string) => {
    setFilter(value);
  }, []);

  const clearSearchQuery = useCallback(() => {
    setSearchQuery('');
  }, []);

  const changeInSearchQuery = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const closeSelectedTodo = useCallback(() => {
    setSelectedTodoId(0);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchQuery={searchQuery}
                value={filter}
                handleOnChange={changeInSearchQuery}
                handleOnDelete={clearSearchQuery}
                handleOnFilter={selectValue}
              />
            </div>

            <div className="block">
              {todos.length > 0
                ? (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodoById={selectedTodoId}
                    handleSelectTodo={selectTodoId}
                  />
                )
                : (
                  <Loader />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          handleOnClose={closeSelectedTodo}
        />
      )}
    </>
  );
};
