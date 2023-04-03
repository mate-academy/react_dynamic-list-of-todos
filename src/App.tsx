/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { SortType } from './types/SortType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortType, setSortType] = useState(SortType.all);
  const [query, setQuery] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  useEffect(() => {
    getTodos().then(loadedTodos => {
      setTodos(loadedTodos);
    });
  }, []);

  const visibleTodos = useMemo(() => {
    return todos
      .filter(todo => {
        switch (sortType) {
          case 'all':
            return true;
          case 'active':
            return !todo.completed;
          case 'completed':
            return todo.completed;
          default:
            return true;
        }
      })
      .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
  }, [todos, sortType, query]);

  const selectedTodo = useMemo(() => {
    return visibleTodos.find(todo => todo.id === selectedTodoId) || null;
  }, [todos, selectedTodoId]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                sortType={sortType}
                onSelectSortType={setSortType}
                query={query}
                onChangeQuery={setQuery}
              />
            </div>

            <div className="block">
              {!todos.length
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodoId={selectedTodoId}
                    onSelectedTodo={setSelectedTodoId}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          onCLose={setSelectedTodoId}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};
