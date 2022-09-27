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
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos().then(res => setTodos(res));
  }, []);

  const handleOnSelectedTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const clearState = () => {
    return (
      setSelectedTodo(null)
    );
  };

  const handleFilterTodos = (nameOfFilter: string) => {
    setFilterBy(nameOfFilter);
  };

  const handleQueryFilter = (queryName: string) => setQuery(queryName);

  const lowerText = (str: string) => (
    str.toLowerCase().includes(query.toLowerCase())
  );

  const filterTodos = todos
    .filter(todoItem => {
      if (filterBy === 'active') {
        return !todoItem.completed;
      }

      if (filterBy === 'completed') {
        return todoItem.completed;
      }

      return todoItem;
    })
    .filter(todoItem => (
      lowerText(todoItem.title)
    ));

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter handleQueryFilter={handleQueryFilter} handleFilterTodos={handleFilterTodos} />
            </div>

            <div className="block">
              {todos.length === 0 && <Loader />}
              <TodoList handleOnSelectedTodo={handleOnSelectedTodo} todos={filterTodos} />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal clearState={clearState} selectedTodo={selectedTodo} />}
    </>
  );
};
