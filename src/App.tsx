/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [selectedTodo, setSlectedTodo] = useState<Todo | null>();
  const [filterType, setFilterType] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const newTodoList = await getTodos();

      setTodoList(newTodoList);
    };

    fetchData();
  }, []);

  const handleClickTodo = (todo?: Todo) => {
    setSlectedTodo(todo);
  };

  const getFilteredList = (newFilterType: string) => {
    switch (newFilterType) {
      case 'completed':
        return todoList.filter(item => item.completed);
      case 'active':
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

  const visibleTodoList = getFilteredList(filterType)
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase().trim()));

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
                <Loader />
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
