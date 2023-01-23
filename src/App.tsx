/* eslint-disable max-len */
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';
import { Todo } from './types/Todo';
import './App.css';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [searchQuery, setSearchQuert] = useState('');
  const [searchBySelect, setSearchBySelect] = useState('all');
  const [, setIsTodosLoading] = useState(false);

  useEffect(() => {
    setIsTodosLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setIsTodosLoading(false));
  }, []);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      const isSearchQuery = todo.title.toLowerCase().includes(searchQuery.toLowerCase());

      let isSearchBySelect;

      switch (searchBySelect) {
        case 'completed':
          isSearchBySelect = todo.completed;
          break;

        case 'active':
          isSearchBySelect = !todo.completed;
          break;

        case 'all':
          return isSearchQuery;

        default:
          break;
      }

      return isSearchQuery && isSearchBySelect;
    });
  }, [searchBySelect, searchQuery, todos]);

  const selectedTodo = useMemo(() => {
    return visibleTodos.find(
      todo => todo.id === selectedTodoId,
    );
  }, [selectedTodoId, visibleTodos]);

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
                query={searchQuery}
                setQuery={setSearchQuert}
                searchBySelect={searchBySelect}
                setSearchBySelect={setSearchBySelect}
              />
            </div>

            <div className="block">
              {visibleTodos.length > 0
                ? (
                  <TodoList
                    todos={visibleTodos}
                    selectTodoId={setSelectedTodoId}
                    selectedTodoId={selectedTodoId}
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
        <TodoModal todo={selectedTodo} closeModal={unselectUser} />
      )}
    </>
  );
};
