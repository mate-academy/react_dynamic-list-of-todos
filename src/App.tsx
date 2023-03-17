/* eslint-disable max-len */
import React, {
  useEffect, useState, useMemo, useCallback,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { FilterType } from './types/FilterType';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [userId, setUserId] = useState(0);
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState(FilterType.All);
  const selectedTodo = todos.find(todo => todo.id === userId);
  const lowerCaseQuery = query.toLowerCase();

  const fetchTodos = useCallback(async () => {
    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
    } catch (error) {
      throw new Error('Error while loading todos');
    }
  }, []);

  const onReset = () => setQuery('');

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      const allTodos = todo.title.toLowerCase().includes(lowerCaseQuery);

      switch (filterType) {
        case FilterType.All:
          return allTodos;

        case FilterType.Completed:
          return allTodos && todo.completed;

        case FilterType.Active:
          return allTodos && !todo.completed;

        default:
          return todos;
      }
    });
  }, [todos, query, filterType]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                value={query}
                onReset={onReset}
                onChange={setQuery}
                onChangeFilterType={(filter) => setFilterType(filter)}
                filterType={filterType}
              />
            </div>

            <div className="block">
              {todos.length > 0
                ? (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodoId={userId}
                    selectTodo={(id) => setUserId(id)}
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
          selectedTodo={selectedTodo}
          onSelect={(id) => setUserId(id)}
        />
      )}
    </>
  );
};
