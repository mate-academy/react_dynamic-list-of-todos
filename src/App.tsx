/* eslint-disable max-len */
import React, {
  memo,
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
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { getVisibleTodos } from './getVisibleTodo';

export const App: React.FC = memo(() => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    try {
      getTodos()
        .then(setTodos);
    } catch (error) {
      setTodos([]);
    }
  }, []);

  const handleSelectTodoId = useCallback((id: number) => {
    setSelectedTodoId(id);
  }, []);

  const handleQuery = useCallback((value: string) => {
    setQuery(value);
  }, []);
  const handleDeleteQuery = useCallback(() => setQuery(''), []);

  const handleStatus = useCallback((value : string) => setStatus(value), []);
  const handleCloseModal = useCallback(() => setSelectedTodoId(0), []);

  const selectedTodo = useMemo(() => (
    todos.find(todo => todo.id === selectedTodoId)
  ), [selectedTodoId]);

  const visibleTodos = useMemo(() => (
    getVisibleTodos(todos, query, status)
  ), [todos, query, status]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onQuery={handleQuery}
                onStatus={handleStatus}
                onDeleteQuery={handleDeleteQuery}
                query={query}
                status={status}
              />
            </div>

            <div className="block">
              {todos.length ? (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={selectedTodoId}
                  onSelectTodoId={handleSelectTodoId}
                />
              ) : (
                <Loader />
              ) }
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onCloseModal={handleCloseModal}
        />
      )}
    </>
  );
});
