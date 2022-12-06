/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const initialTodos = [] as Todo[];
  const initialTodo = {} as Todo;
  const [filterBy, setFilterBy] = useState('all');
  const [todos, setTodos] = useState(initialTodos);
  const [searchBy, setSearchBy] = useState('');
  const [showTodoModal, setShowTodoModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(initialTodo);

  useEffect(() => {
    getTodos()
      .then(response => setTodos(response));
  }, []);

  let visibleTodos = todos.filter(todo => {
    switch (filterBy) {
      case 'all':
        return true;
      case 'completed':
        return todo.completed;
      case 'active':
        return !todo.completed;
      default:
        return false;
    }
  });

  if (searchBy) {
    visibleTodos = visibleTodos.filter(todo => todo.title
      .toLocaleLowerCase()
      .includes(searchBy.toLocaleLowerCase()));
  }

  const isVisibleLoader = visibleTodos.length === 0 && searchBy === '';

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilterBy={setFilterBy}
                filterBy={filterBy}
                searchBy={searchBy}
                setSearchBy={setSearchBy}
              />
            </div>

            <div className="block">
              {isVisibleLoader && (<Loader />)}
              {todos.length > 0 && (
                <TodoList
                  todos={visibleTodos}
                  setShowTodoModal={setShowTodoModal}
                  setSelectedTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {showTodoModal && (
        <TodoModal
          selectedTodo={selectedTodo}
          initialTodo={initialTodo}
          setSelectedTodo={setSelectedTodo}
          setShowTodoModal={setShowTodoModal}
        />
      )}
    </>
  );
};
