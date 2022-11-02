import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
// import { TodoModal } from './components/TodoModal';
// import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const [todos, settodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState(FilterType.All);

  getTodos().then(todosFromServer => settodos(todosFromServer));

  const filterTodos = () => {
    const todosMatchedQuery = todos.filter(({ title }) => {
      const titleToLowerCase = title.toLowerCase();
      const queryToLowerCase = query.toLowerCase();

      return titleToLowerCase.includes(queryToLowerCase);
    });

    return todosMatchedQuery.filter(todo => {
      switch (filterType) {
        case FilterType.Active:
          return !todo.completed;

        case FilterType.Completed:
          return todo.completed;

        default:
          return todo;
      }
    });
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                filterType={filterType}
                setFilterType={setFilterType}
              />
            </div>

            <div className="block">
              {/* <Loader /> */}
              <TodoList todos={filterTodos()} />
            </div>
          </div>
        </div>
      </div>

      {/* <TodoModal /> */}
    </>
  );
};
