/* eslint-disable max-len */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { useTodos } from './useTodos';
import { Filter } from './types/Filter';

const filterTodos = (todos: Todo[], filter: Filter, searchInput: string) => {
  return (todos.filter(todo => {
    if (filter === 'active' && todo.completed) {
      return false;
    }

    if (filter === 'completed' && !todo.completed) {
      return false;
    }

    if (
      !todo.title.toLocaleLowerCase().includes(
        searchInput.toLocaleLowerCase(),
      )
    ) {
      return false;
    }

    return true;
  })
  );
};

export const App: React.FC = () => {
  const { todos, isLoading } = useTodos();
  const [chosenTodo, setChosenTodo] = useState<Todo | null>(null);
  const [searchInput, setSearchInput] = useState<string>('');
  const [filter, setFilter] = useState<Filter>('all');

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                filter={filter}
                setFilter={setFilter}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    dataTodos={filterTodos(todos, filter, searchInput)}
                    setChosenTodo={setChosenTodo}
                    chosenTodo={chosenTodo}
                  />
                )}

            </div>
          </div>
        </div>
      </div>

      {chosenTodo && (
        <TodoModal
          chosenTodo={chosenTodo}
          setChosenTodo={setChosenTodo}
        />
      )}
    </>
  );
};
