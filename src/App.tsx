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
    getTodos()
      .then(todo => setTodos(todo))
      .finally(() => setIsLoadEnd(true));
  }, []);

  const sortedTodousingFilter = () => {
    switch (filter) {
      case 'all':
        return todos;
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
      default:
        return todos.filter(todo => todo.completed);
    }
  };

  const sortedTodo = () => {
    const prepSearchText = searchText.toLowerCase();

    return sortedTodousingFilter().filter(todo => (
      todo.title.toLowerCase().includes(prepSearchText)
    ));
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilter={setFilter}
                searchText={searchText}
                setSearchText={setSearchText}
              />
            </div>

            <div className="block">
              {!isLoadEnd && (<Loader />)}
              <TodoList
                todos={sortedTodo()}
                selectedTodo={selectedTodo}
                setSelectedTodo={setSelectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} selectedTodo={setSelectedTodo} />
      )}
    </>
  );
};
