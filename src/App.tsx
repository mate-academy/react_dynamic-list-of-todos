// eslint-disable max-len
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Filter } from './types/Filter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

const getVisibleTodos = (
  todos: Todo[],
  query: Todo['title'],
  filter: Filter,
) => {
  switch (filter) {
    case Filter.ACTIVE:
      return todos.filter(
        todo => !todo.completed && todo.title.includes(query),
      );

    case Filter.COMPLETED:
      return todos.filter(
        todo => todo.completed && todo.title.includes(query),
      );

    case Filter.ALL:
    default:
      return todos.filter(
        todo => todo.title.includes(query),
      );
  }
};

export const App: React.FC = () => {
  const [filter, setFilter] = useState<Filter>(Filter.ALL);
  const [appliedQuery, setAppliedQuery] = useState('');
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      getTodos()
        .then(todos => {
          setVisibleTodos(getVisibleTodos(todos, appliedQuery, filter));
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 200);
  }, [filter, appliedQuery]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                onFilter={setFilter}
                onAppliedQuery={setAppliedQuery}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {(!isLoading && visibleTodos.length > 0)
                && (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={selectedTodo}
                    onSelectedTodo={setSelectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
