/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todosList, setTodosList] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filteredTodos, setFilteredTodos] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    getTodos().then(setTodosList);
  }, []);

  let visibleTodos = [...todosList];

  if (filteredTodos) {
    switch (filteredTodos) {
      case 'all':
        visibleTodos = todosList;
        break;
      case 'active':
        visibleTodos = visibleTodos.filter(todo => todo.completed === false);
        break;
      case 'completed':
        visibleTodos = visibleTodos.filter(todo => todo.completed === true);
        break;
      default:
        break;
    }
  }

  if (searchQuery) {
    const preparedQuery = searchQuery.toLowerCase();

    visibleTodos = visibleTodos.filter(todo => todo.title.toLowerCase().includes(preparedQuery));
  }

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilteredTodos(event.target.value);
  };

  const onTodoSelect = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const clear = () => {
    setSelectedTodo(null);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter filter={handleSelect} setSearchQuery={setSearchQuery} searchQuery={searchQuery} clearSearch={clearSearch} />
            </div>

            {visibleTodos.length !== 0 ? (
              <div className="block">
                <TodoList todos={visibleTodos} onTodoSelect={onTodoSelect} selectedTodo={selectedTodo} />
              </div>
            )
              : (<Loader />)}
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal todo={selectedTodo} clear={clear} />}
    </>
  );
};