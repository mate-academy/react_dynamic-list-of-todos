/* eslint-disable max-len */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getVisibleTodos } from './GetVisibleTodos';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [query, setQuery] = useState('');
  const [completedFilter, setCompletedFilter] = useState('all');

  const handleSelectTodo = useCallback((id: number) => {
    setSelectedTodoId(id);
  }, []);

  const handleQuery = useCallback((str: string) => {
    setQuery(str.toLowerCase());
  }, []);

  const deleteQuery = useCallback(() => setQuery(''), []);

  const handleFilter = useCallback((str: string) => setCompletedFilter(str), []);
  const closeModal = useCallback(() => setSelectedTodoId(0), []);

  const selectedTodo = useMemo(() => (
    todos.find(todo => todo.id === selectedTodoId)
  ), [selectedTodoId]);

  const visibleTodos = useMemo(() => (
    getVisibleTodos(todos, query, completedFilter)
  ), [query, completedFilter, todos]);

  useEffect(() => {
    getTodos()
      .then((loadedTodo) => setTodos(loadedTodo));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onChangeQuery={handleQuery}
                onChangeComplitedFilter={handleFilter}
                query={query}
                complitedFilter={completedFilter}
                onClearQueryFilter={deleteQuery}
              />
            </div>

            <div className="block">
              {todos.length ? (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={selectedTodoId}
                  onSelectedTodo={handleSelectTodo}
                />
              ) : (
                <Loader />
              )}

            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onCloseModal={closeModal} />
      )}
    </>
  );
};
