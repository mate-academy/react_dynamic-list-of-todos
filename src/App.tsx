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
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setTodos([]));
  }, []);

  const closeTodoModal = useCallback(() => {
    setSelectedTodoId(0);
  }, []);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      const isSearchQuery = todo.title.toLowerCase().includes(searchQuery.toLowerCase());

      let searchSelect;

      switch (selectedFilter) {
        case 'completed':
          searchSelect = todo.completed;
          break;

        case 'active':
          searchSelect = !todo.completed;
          break;

        case 'all':
          return isSearchQuery;

        default:
          break;
      }

      return isSearchQuery && searchSelect;
    });
  }, [searchQuery, selectedFilter, todos]);

  const selectedTodo = useMemo(() => {
    return visibleTodos.find(
      todo => todo.id === selectedTodoId,
    );
  }, [selectedTodoId, visibleTodos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedFilter={selectedFilter}
                searchQuery={searchQuery}
                onSelectedFilter={setSelectedFilter}
                onSearchQuery={setSearchQuery}
              />
            </div>

            <div className="block">
              {todos.length
                ? (
                  <TodoList
                    todos={visibleTodos}
                    selectTodoId={setSelectedTodoId}
                    selectedTodoId={selectedTodoId}
                  />
                )
                : <Loader /> }
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal onCloseModal={closeTodoModal} todo={selectedTodo} />
      )}
    </>
  );
};
