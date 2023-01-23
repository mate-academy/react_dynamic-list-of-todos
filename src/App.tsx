/* eslint-disable max-len */
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
import './App.scss';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedFilter, setCompletedFilter] = useState('all');
  const [isTodoLoading, setIsTodoLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState(0);

  useEffect(() => {
    setIsTodoLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsTodoLoading(false));
  }, []);

  const selectedTodo = useMemo(() => {
    return todos.find((todo) => todo.id === selectedTodoId);
  }, [selectedTodoId, todos]);

  const visibleTodos = useMemo(() => {
    return todos.filter((todo) => {
      const { title, completed } = todo;
      const preparedTitle = title.toLowerCase().trim();
      const preparedQuery = searchQuery.toLowerCase().trim();

      const filterByTitle = preparedTitle.includes(preparedQuery);

      switch (completedFilter) {
        case 'active':
          return filterByTitle && !completed;

          break;
        case 'completed':
          return filterByTitle && completed;
          break;

        case 'all':
        default:
          return filterByTitle;
          break;
      }
    });
  }, [searchQuery, completedFilter, todos]);

  const unselectUser = useCallback(() => {
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
                setSearchQuery={setSearchQuery}
                filter={completedFilter}
                setFilter={setCompletedFilter}
              />
            </div>

            {isTodoLoading
              ? <Loader />
              : (
                <div className="block">
                  <TodoList
                    todos={visibleTodos}
                    selectedTodoId={selectedTodoId}
                    setSelectedTodoId={setSelectedTodoId}
                  />
                </div>
              )}

          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={unselectUser}
        />
      )}
    </>
  );
};
