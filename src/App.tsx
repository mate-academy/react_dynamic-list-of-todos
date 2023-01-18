/* eslint-disable max-len */
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Todo } from './types/Todo';

import { getTodos } from './api';
import { Loader } from './components/Loader';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { getFilteredTodos } from './tools/filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodo] = useState(0);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    try {
      getTodos()
        .then(setTodos);
    } catch (error) {
      setTodos([]);
    }
  }, []);

  const handleClickTodo = useCallback((todoId: number) => {
    setSelectedTodo(todoId);
  }, []);

  const todo = useMemo(() => (
    todos.find(item => item.id === selectedTodoId)
  ), [selectedTodoId]);

  const visibleTodos = useMemo(() => {
    return getFilteredTodos(todos, query, filter);
  }, [query, todos, filter]);

  const handleCloseModal = useCallback(() => {
    setSelectedTodo(0);
  }, []);

  const handleChangeQuery = useCallback((value: string) => {
    setQuery(value);
  }, []);

  const handleChangeFilter = useCallback((value: string) => {
    setFilter(value);
  }, []);

  const handleclearQuery = useCallback(() => {
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
                onInputChange={handleChangeQuery}
                query={query}
                value={filter}
                onDeleteQuery={handleclearQuery}
                onFilterChange={handleChangeFilter}
              />
            </div>

            <div className="block">
              {todos.length
                ? (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodoId={selectedTodoId}
                    onSelectTodo={handleClickTodo}
                  />
                )

                : <Loader />
              }

            </div>
          </div>
        </div>
      </div>

      {todo && (
        <TodoModal
          todo={todo}
          onCancelModal={handleCloseModal}
        />
      )}
    </>
  );
};
