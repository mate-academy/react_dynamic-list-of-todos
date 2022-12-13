/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';
import { Todo } from './types/Todo';
import { SortType } from './types/FilterTypes';

type ReorderOptions = {
  filterType: SortType,
  query: string,
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosLoaded, setTodosLoaded] = useState(true);

  const [selectedTodo, setSelectedTodo] = useState<number | null>(null);

  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState(SortType.All);

  async function LoadTodos() {
    const reponse = await getTodos();

    setTodosLoaded(false);

    setTodos(reponse);
  }

  useEffect(() => {
    LoadTodos();
  }, []);

  const onChangeFilterType = (type: SortType) => {
    setFilterType(type);
  };

  function getFilteredGoods({ filterType: type, query: input }: ReorderOptions) {
    const filteredByFilter = [...todos].filter(todo => {
      switch (type) {
        case SortType.Active:
          return todo.completed === false;

        case SortType.Completed:
          return todo.completed === true;

        default:
          return todo;
      }
    });

    let visibleGoods = filteredByFilter;

    if (input) {
      visibleGoods = filteredByFilter.filter(todo => todo
        .title.toLocaleLowerCase().includes(query.toLowerCase().trim()));
    }

    return visibleGoods;
  }

  const visibleTodos = useMemo(() => {
    return getFilteredGoods({ filterType, query });
  }, [filterType, query, todos]);

  const handleClick = (id: number | null) => {
    setSelectedTodo(id);
  };

  const onChangeInput = (str: string) => {
    setQuery(str);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                valueInput={query}
                filterType={filterType}
                onChangeInput={onChangeInput}
                onChangeFilterType={onChangeFilterType}
              />
            </div>

            <div className="block">
              {todosLoaded
                ? (<Loader />)
                : (
                  <TodoList
                    todos={visibleTodos}
                    todoId={selectedTodo}
                    handleClick={handleClick}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          handleClick={handleClick}
          selectedTodo={visibleTodos[selectedTodo - 1]}
        />
      )}
    </>
  );
};
