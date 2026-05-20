/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getActive, getCompleted, getTodos } from './api';

export const App: React.FC = () => {
  const [todoSelected, setTodoSelected] = useState<Todo | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterOption, setFilterOption] = useState('all');
  const [query, setQuery] = useState('');

  const closeTodo = () => {
    setTodoSelected(null);
  };

  useEffect(() => {
    switch (filterOption) {
      case 'all':
        getTodos().then(setTodos);
        break;
      case 'completed':
        getCompleted().then(setTodos);
        break;
      case 'active':
        getActive().then(setTodos);
        break;
    }
  }, [filterOption]);

  useEffect(() => {
    setFilteredTodos(
      todos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      ),
    );
  }, [query, todos]);

  useEffect(() => {
    getTodos().then(items => {
      setTodos(items);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilterOption={setFilterOption}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={filteredTodos}
                onTodoSelect={setTodoSelected}
                todoSelected={todoSelected}
              />
            </div>
          </div>
        </div>
      </div>

      {todoSelected && (
        <TodoModal todoSelected={todoSelected} closeTodo={closeTodo} />
      )}
    </>
  );
};
