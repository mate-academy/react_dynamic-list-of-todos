import React, { FC, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: FC = () => {
  // Category block
  const [category, setCategory] = useState('all');

  const handleChangeCategory = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setCategory(event.target.value);
  };

  // Query block
  const [query, setQuery] = useState('');

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const resetQuery = () => (setQuery(''));

  // Todos block
  const [todos, setTodos] = useState<Todo[]>();
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>();

  useEffect(() => {
    getTodos().then(todosList => setTodos(todosList));
  }, [selectedTodo]);

  const selectTodo = (todo: Todo | null) => {
    setSelectedTodo(todo);
  };

  const visibleTodos = todos?.filter(todo => {
    const titleLowerCase = todo.title.toLowerCase();
    const queryLowerCase = query.toLowerCase();
    const isTitleIncludeQuery = titleLowerCase.includes(queryLowerCase);

    switch (category) {
      case 'completed':
        return todo.completed && isTitleIncludeQuery;
      case 'active':
        return !todo.completed && isTitleIncludeQuery;
      default:
        return isTitleIncludeQuery;
    }
  }) || null;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                category={category}
                handleChangeCategory={handleChangeCategory}
                query={query}
                handleChangeQuery={handleChangeQuery}
                resetQuery={resetQuery}
              />
            </div>

            <div className="block">
              {todos
                ? (
                  <TodoList
                    todos={visibleTodos}
                    chooseTodo={selectTodo}
                    selectedTodo={selectedTodo || null}
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
          resetTodo={() => selectTodo(null)}
        />
      )}
    </>
  );
};
