/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

enum FilterType {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [filterValue, setFilterValue] = useState<FilterType>(FilterType.All);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setVisibleTodos(todosFromServer);
      });
  }, []);

  useEffect(() => {
    switch (filterValue) {
      case FilterType.All:
        setVisibleTodos(todos);

        break;

      case FilterType.Active:
        setVisibleTodos([...todos].filter(todo => !todo.completed));

        break;

      case FilterType.Completed:
        setVisibleTodos([...todos].filter(todo => todo.completed));

        break;

      default:
        break;
    }

    setVisibleTodos(prevTodos => prevTodos.filter(todo => {
      const lowCaseQuery = query.toLocaleLowerCase();
      const lowCaseTitle = todo.title.toLocaleLowerCase();

      return lowCaseTitle.includes(lowCaseQuery);
    }));
  }, [filterValue, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onSetQuery={setQuery}
                filterValue={filterValue}
                onSetFilterValue={setFilterValue}
              />
            </div>

            <div className="block">
              {todos.length === 0 ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={selectedTodo?.id}
                  setSelectedTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo?.id && (
        <TodoModal
          selectedTodo={selectedTodo}
          cleanSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
