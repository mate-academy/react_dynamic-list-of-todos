/* eslint-disable max-len */
import React, {
  useCallback, useEffect, useState, useMemo,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';
import { FilterBy } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.ALL);

  const handleSelectingTodo = useCallback((todo: Todo) => {
    setSelectedTodo(todo);
  }, []);

  const visibleTodos = useMemo(() => {
    return todos.filter(({ title, completed }: Todo) => {
      const prepsredQuery = query.toLowerCase().trim();
      const preparedTitle = title.toLowerCase();

      let isCompleted;

      switch (filterBy) {
        case FilterBy.ACTIVE:
          isCompleted = !completed;
          break;

        case FilterBy.COMPLETED:
          isCompleted = completed;
          break;

        default:
          isCompleted = true;
      }

      return preparedTitle.includes(prepsredQuery) && isCompleted;
    });
  }, [todos, query, filterBy]);

  useEffect(() => {
    getTodos()
      .then(setTodos);
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
                filterBy={filterBy}
                onFilterChange={setFilterBy}
                onQueryChange={setQuery}
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
