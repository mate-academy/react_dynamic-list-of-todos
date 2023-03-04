/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
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
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [selectedTodo, setSlectedTodo] = useState<Todo | null>();
  const [filterType, setFilterType] = useState('all');
  const [query, setQuery] = useState('');
  const [hasLoadingError, setLoadingError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingError(false);
      try {
        const newTodoList = await getTodos();

        setTodoList(newTodoList);
      } catch (error) {
        setLoadingError(true);
      }
    };

    fetchData();
  }, []);

  const handleClickTodo = (todo?: Todo) => {
    setSlectedTodo(todo);
  };

  const getFilteredList = (newFilterType: string) => {
    switch (newFilterType) {
      case FilterType.COMPLETED:
        return todoList.filter(item => item.completed);
      case FilterType.ACTIVE:
        return todoList.filter(item => !item.completed);
      default:
        return todoList;
    }
  };

  const handleSelelect = (newSelectFilterType: string) => {
    setFilterType(newSelectFilterType);
  };

  const handleQuery = (newQuery: string) => {
    setQuery(newQuery);
  };

  const visibleTodoList = useMemo(() => {
    return getFilteredList(filterType)
      .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase().trim()));
  }, [query, filterType, todoList]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterType={filterType}
                onFilterType={handleSelelect}
                onQuery={handleQuery}
                query={query}
              />
            </div>

            <div className="block">
              {todoList.length === 0 ? (
                hasLoadingError ? 'Error: Data has not been loaded' : <Loader />
              ) : (
                <TodoList
                  todos={visibleTodoList}
                  onSelectedTodo={handleClickTodo}
                  selectedTodoId={selectedTodo?.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onSelectedTodo={handleClickTodo}
        />
      )}
    </>
  );
};
