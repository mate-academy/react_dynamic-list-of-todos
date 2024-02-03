/* eslint-disable max-len */
import React, { useContext, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { TodosContext } from './contexts/TodoProvider';
import { TodoModal } from './components/TodoModal';
import { filterTodos } from './utils/filterTodos';

export const App: React.FC = () => {
  const {
    todos,
    filterOptions: { query, status },
    selectedTodo,
  } = useContext(TodosContext);
  const filteredTodos = useMemo(
    () => filterTodos(todos, { query, status }),
    [todos, query, status],
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {todos.length
                ? <TodoList todos={filteredTodos} />
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {!!selectedTodo && (<TodoModal />)}
    </>
  );
};
