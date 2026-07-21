/* eslintodo-disable max-len */
import React from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [selectedTodo, setSelectedTodo] = React.useState<Todo | null>(null);
  const [filter, setFilter] = React.useState<string>('all');
  const [searchString, setSearchString] = React.useState<string>('');

  React.useEffect(() => {
    getTodos()
      .then(todosList => {
        setTodos(todosList);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const getVisibleTodos = (
    filterValue: string,
    searchValue: string,
  ): Todo[] => {
    let result = todos;

    if (searchValue) {
      result = result.filter(todo =>
        todo.title.toLowerCase().includes(searchValue.toLowerCase()),
      );
    }

    switch (filterValue) {
      case 'active':
        return result.filter(todo => !todo.completed);
      case 'completed':
        return result.filter(todo => todo.completed);
      default:
        return result;
    }
  };

  const visibleTodos = getVisibleTodos(filter, searchString);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                setFilter={setFilter}
                searchString={searchString}
                setSearchString={setSearchString}
              />
            </div>

            <div className="block">
              {loading && <Loader data-cy="loader" />}
              {!loading && todos.length > 0 && (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={() => setSelectedTodo(null)} />
      )}
    </>
  );
};
