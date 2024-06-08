/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoFilterStatus } from './types/TodoList';

export const App: React.FC = () => {
  const [loadedTodos, setLoadedTodos] = useState<Todo[]>([]);
  const [postetTodoId, setPostetTodoId] = useState<Todo>();

  const [filterPost, setFilterPost] = useState('');
  const [textFilter, setTextFilter] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setLoadedTodos)
      .finally(() => setIsLoading(false));
  }, []);

  function setIsLoadings(todo?: Todo): void {
    setPostetTodoId(todo);
    setFilterLoading(false);
    setIsLoading(true);
  }

  function unSelectTodo() {
    setIsLoading(false);
    setFilterLoading(false);
    setPostetTodoId(undefined);
  }

  function handleChangeFilter(e: React.ChangeEvent<HTMLSelectElement>) {
    setFilterPost(e.target.value);
  }

  function handleChangeText(e: React.ChangeEvent<HTMLInputElement>) {
    setTextFilter(e.target.value);
  }

  function filterByPost(todos: Todo[]): Todo[] {
    const lowerCaseTextFilter = textFilter ? textFilter.toLowerCase() : '';

    const filteredByText = todos.filter(todo =>
      todo.title.toLowerCase().includes(lowerCaseTextFilter),
    );

    switch (filterPost) {
      case TodoFilterStatus.all:
        return filteredByText;

      case TodoFilterStatus.active:
        return filteredByText.filter(todo => !todo.completed);

      case TodoFilterStatus.completed:
        return filteredByText.filter(todo => todo.completed);

      default:
        if (textFilter) {
          return filteredByText.filter(todo =>
            todo.title.toLowerCase().includes(lowerCaseTextFilter),
          );
        } else {
          return filteredByText;
        }
    }
  }

  function handleClearButton() {
    setTextFilter('');
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterPosts={handleChangeFilter}
                textFilter={handleChangeText}
                isHaveText={textFilter}
                clearButton={handleClearButton}
              />
            </div>

            <div className="block">
              {filterLoading && <Loader />}
              <TodoList
                todos={loadedTodos}
                handleClick={setIsLoadings}
                filterPost={filterByPost}
                selectedPost={postetTodoId}
              />
            </div>
          </div>
        </div>
      </div>
      {isLoading && (
        <TodoModal todos={postetTodoId} unSelectTodo={unSelectTodo} />
      )}
    </>
  );
};
