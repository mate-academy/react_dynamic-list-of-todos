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
import { getVisibleTodos } from './helper';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const handleSelectTodo = useCallback((id: number) => {
    setSelectedTodoId(id);
  }, []);

  const handleQuery = useCallback((str: string) => {
    setQuery(str.toLowerCase());
  }, []);
  const deleteQuery = useCallback(() => setQuery(''), []);

  const handleFilter = useCallback((str : string) => setFilter(str), []);
  const closingModal = useCallback(() => setSelectedTodoId(0), []);

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId);
  const visibleTodos = useMemo(() => (
    getVisibleTodos(todos, query, filter)
  ), [query, filter]);

  useEffect(() => {
    async function fetchTodos() {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
    }

    fetchTodos();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onQuery={handleQuery}
                onFilter={handleFilter}
                queryValue={query}
                filterValue={filter}
                deleteQuery={deleteQuery}
              />
            </div>

            <div className="block">
              {todos.length ? (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={selectedTodoId}
                  onSelectTodo={handleSelectTodo}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal todo={selectedTodo} onCancelModal={closingModal} />
      )}
    </>
  );
};
