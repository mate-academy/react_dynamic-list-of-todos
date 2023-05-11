import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilterBy } from './types/FilterBy';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [query, setQuery] = useState('');

  const loadTodos = useCallback(async () => {
    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
    } catch (error) {
      throw new Error();
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, []);

  const handleSelectingTodo = useCallback((todo: Todo) => {
    setSelectedTodo(todo);
  }, []);

  const handleSetQuery = useCallback((string: string) => {
    setQuery(string);
  }, []);

  const handleCloseModal = () => setSelectedTodo(null);

  const handleReset = () => {
    setQuery('');
  };

  const preparedTodos = useMemo(() => {
    let visibleTodos: Todo[] = [...todos];

    visibleTodos = visibleTodos.filter(todo => {
      switch (selectedStatus) {
        case FilterBy.ALL:
          return true;

        case FilterBy.COMPLETED:
          return todo.completed;

        case FilterBy.ACTIVE:
          return !todo.completed;

        default:
          return true;
      }
    });

    if (query) {
      const lowerCaseQuery = query.toLowerCase().trim();

      visibleTodos = visibleTodos.filter(
        ({ title }) => title.toLowerCase().includes(lowerCaseQuery),
      );
    }

    return visibleTodos;
  }, [selectedStatus, query, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={selectedStatus}
                handleSetStatus={setSelectedStatus}
                query={query}
                handleSetQuery={handleSetQuery}
                handleReset={handleReset}
              />
            </div>

            <div className="block">
              {preparedTodos.length
                ? (
                  <TodoList
                    visibleTodos={preparedTodos}
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
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
