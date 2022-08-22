/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoadEnd, setIsLoadEnd] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo>();
  const [filter, setFilter] = useState('all');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    getTodos().then(todo => setTodos(todo))
      .finally(() => setIsLoadEnd(true));
  }, []);

  const sortedTodo = todos.filter(currTodo => {
    switch (filter) {
      case 'all':
        if (currTodo.title.includes(searchText)) {
          return true;
        }

        break;
      case 'active':
        if (currTodo.completed === false
          && currTodo.title.includes(searchText)) {
          return true;
        }

        break;
      case 'completed':
      default:
        if (currTodo.completed === true
          && currTodo.title.includes(searchText)) {
          return true;
        }
    }

    return false;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={setFilter}
                searchText={searchText}
                setSearchSet={setSearchText}
              />
            </div>

            <div className="block">
              <Loader isLoadEnd={isLoadEnd} />
              <TodoList
                todos={sortedTodo}
                selectedTodo={selectedTodo}
                setSelectedTodo={setSelectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} closeTodo={setSelectedTodo} />
      )}
    </>
  );
};
