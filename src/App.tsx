/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilteredBy } from './types/Filter';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [searchWord, setSearchWord] = useState('');
  const [filterOption, setFilterOption] = useState(FilteredBy.ALL);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos().then(setTodoList);
  }, [currentTodo?.userId]);

  const filteredTodos = useMemo(() => {
    return todoList.filter(todo => {
      switch (filterOption) {
        case FilteredBy.ALL:
          return todo.title.includes(searchWord.toLowerCase().trim());
        case FilteredBy.ACTIVE:
          return !todo.completed && todo.title.includes(searchWord.toLowerCase().trim());
        case FilteredBy.COMPLETED:
          return todo.completed && todo.title.includes(searchWord.toLowerCase().trim());
        default:
          return true;
      }
    });
  }, [filterOption, searchWord, todoList]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSearchWordChange={setSearchWord}
                onFilterChange={setFilterOption}
                searchWord={searchWord}
              />
            </div>

            <div className="block">
              {!todoList.length
                ? (<Loader />) : (
                  <TodoList
                    todos={filteredTodos}
                    currentTodo={currentTodo}
                    setCurrentTodo={setCurrentTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {currentTodo && (
        <TodoModal
          todo={currentTodo}
          closeModal={setCurrentTodo}
        />
      )}
    </>
  );
};
