/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { getTodos } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';
import { FilterParams } from './types/FilterParams';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadingTodos, setLoadingTodos] = useState(false);

  const [filterBy, setFilterBy] = useState<FilterParams>(FilterParams.all);
  const [querry, setQuerry] = useState('');

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handlefilterParChange = (event: React.ChangeEvent<HTMLSelectElement>) => setFilterBy(event.target.value as FilterParams);
  const handleQuerryChange = (event: React.ChangeEvent<HTMLInputElement>) => setQuerry(event.target.value);

  const clearQuerryFild = () => {
    setQuerry('');
    setFilterBy(FilterParams.all);
  };

  useEffect(() => {
    setLoadingTodos(true);

    getTodos().then(items => {
      setTodos(items);
      setLoadingTodos(false);
    });
  }, []);

  const filtredTodos = todos
    .filter(todo => {
      switch (filterBy) {
        case FilterParams.completed:
          return todo.completed;
        case FilterParams.active:
          return !todo.completed;
        default:
          return true;
      }
    })
    .filter(todo => {
      if (querry) {
        // const searchValue = querry.split(' ').filter(word => word).join(' ');

        return todo.title.toLowerCase().includes(querry.toLowerCase());
      }

      return true;
    });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterParam={filterBy}
                changeParams={handlefilterParChange}
                querry={querry}
                querryChange={handleQuerryChange}
                deletequerry={clearQuerryFild}
              />
            </div>

            <div className="block">
              {loadingTodos ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filtredTodos}
                  selectedTodo={selectedTodo}
                  changeSelectedTodo={(item: Todo) => setSelectedTodo(item)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          clearsetSelectedTodo={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
