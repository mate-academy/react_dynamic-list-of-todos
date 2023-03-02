/* eslint-disable max-len */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { debounce } from 'lodash';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilterBy, filterTodo } from './utils/filterTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.All);
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');

  const getTodosFromServer = async () => {
    try {
      const todoFromServer = await getTodos();

      setTodos(todoFromServer);
      setIsLoading(false);
    } catch {
      // console.log('data no load from server');
    }
  };

  const getFilterField = useCallback(((field: FilterBy) => {
    setFilterBy(field);
  }), []);

  const getQuery = useCallback(((text: string) => {
    setQuery(text);
  }), []);

  useEffect(() => {
    getTodosFromServer();
  }, []);

  const selectTodo = useCallback(((todo: Todo | null) => {
    setSelectedTodo(todo);
  }), []);

  const applyQuery = useCallback(debounce(setAppliedQuery, 1000), []);

  const visibleTodo = useMemo(() => (
    filterTodo(todos, filterBy, appliedQuery)
  ), [todos, filterBy, appliedQuery]);

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
                getFilterField={getFilterField}
                getQuery={getQuery}
                applyQuery={applyQuery}
              />
            </div>

            <div className="block">
              {
                isLoading
                  ? <Loader />
                  : (
                    <TodoList
                      todos={visibleTodo}
                      selectTodo={selectTodo}
                      selectedTodo={selectedTodo}
                    />
                  )
              }
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && <TodoModal todo={selectedTodo} selectTodo={selectTodo} />}
    </>
  );
};
