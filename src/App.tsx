/* eslint-disable max-len */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';

import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoad, setIsLoad] = useState(false);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState('all');

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const loadTodos = async () => {
    const todos = await getTodos();

    setIsLoad(true);

    setTodos(todos);
  };

  const filteredTodos = todos.filter((todo: Todo) => todo.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
  let visibleTodos = filteredTodos;

  const setVisibleTodos = () => {
    switch (filterBy) {
      case 'all':
        return filteredTodos;
      case 'completed':
        return visibleTodos = filteredTodos.filter((todo) => todo.completed);

      case 'active':
        return visibleTodos = filteredTodos.filter((todo) => !todo.completed);

      default:
        return;
    }
  };

  const onHideModal = () => {
    setSelectedTodo(null);
  };

  const handleTodoSelect = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleQuatyChange = (value: string) => {
    setQuery(value);
  };

  const handleFilteredBy = (value: string) => {
    setFilterBy(value);
  };

  setVisibleTodos();

  loadTodos();

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                handleQuatyChange={handleQuatyChange}
                filterBy={filterBy}
                handleFilteredBy={handleFilteredBy}
              />
            </div>

            <div className="block">
              {!isLoad ? (
                <Loader />
              ) : (
                <TodoList todos={visibleTodos} handleTodoSelect={handleTodoSelect} selectedTodo={selectedTodo} />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onHideModal={onHideModal} />
      )}
    </>

  );
};
