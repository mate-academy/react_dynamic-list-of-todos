/* eslint-disable max-len */
import React, { useState, useEffect, useCallback } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import * as api from './api'


export enum SortType {
  all = 'all',
  active = 'active',
  completed = 'completed',
}


const getFilteredTodos = (
  todos: Todo[],
  sort: string,
  query: string,
): Todo[] => {
  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(query.toLowerCase())
  );

  switch (sort) {
    case SortType.active:
      return filteredTodos.filter(todo => !todo.completed);
    case SortType.completed:
      return filteredTodos.filter(todo => todo.completed);
    default:
      return filteredTodos;
  }
};


export const App: React.FC = () => {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortBy, setSortBy] = useState<string>(SortType.all);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    api.getTodos().then(setTodos);
  }, []);

  const onSelectChange = useCallback((value: string) => {
    setSortBy(value)
  }, []);

  const getTodo = useCallback((todo: Todo) => {
    setSelectedTodo((prevTodo) => (prevTodo?.id !== todo.id ? todo : prevTodo));
  }, []);

  const handleCloseModal = () => {
    setSelectedTodo(null);
  };

  const onInputChange = useCallback((value: string) => {
    setQuery(value);
  }, []);

  const onClearQuery = useCallback(() => {
    setQuery('');
  }, []);

  const filteredTodos = getFilteredTodos(todos, sortBy, query);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelectChange={onSelectChange}
                onInputChange={onInputChange}
                query={query}
                onClearQuery={onClearQuery}
              />
            </div>

            <div className="block">
              {!todos.length && <Loader />}
              <TodoList
                filteredTodos={filteredTodos}
                getTodo={getTodo}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};
