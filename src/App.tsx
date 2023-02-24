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
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoad, setIsLoad] = useState(false);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState('all');

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const loadTodosData = async () => {
    const todosData = await getTodos();
    setIsLoad(true);
    setTodos(todosData);
  };

  const filteredTodos = todos.filter((todo: Todo) => todo.title.toLowerCase().includes(query.toLowerCase()));
  let visibleTodos = filteredTodos;

  const setVisibleTodos = () => {
    visibleTodos = filteredTodos.filter((todo) => {
      switch (filterBy) {
        case 'all':
          return todo;
        case 'completed':
          return todo.completed;

        case 'active':
          return !todo.completed;

        default:
          return [];
      }
    })
  };

  useEffect(() => {
    loadTodosData();
  }, [visibleTodos])

  const onHideModal = () => {
    setSelectedTodo(null);
  };

  setVisibleTodos();

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                handleQuatyChange={setQuery}
                filterBy={filterBy}
                handleFilteredBy={setFilterBy}
              />
            </div>

            <div className="block">
              {!isLoad ? (
                <Loader />
              ) : (
                <TodoList todos={visibleTodos} handleTodoSelect={setSelectedTodo} selectedTodo={selectedTodo} />
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
