/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
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
  const [selectTodoId, setSelectedTodoId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filterValue, setFilterValue] = useState('all');
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    getTodos()
      .then((response) => {
        setTodos(response);
        setLoading(true);
      });
  }, []);

  const filterTodos = todos.filter((todo) => {
    switch (filterValue) {
      case 'active':
        return !todo.completed;

      case 'completed':
        return todo.completed;

      default:
        return todo;
    }
  }).filter((todo) => {
    return todo.title.toLowerCase().includes(filterText.toLowerCase());
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                todos={todos}
                value={filterValue}
                text={filterText}
                setFilterValue={setFilterValue}
                setFilterText={setFilterText}
              />
            </div>

            <div className="block">
              {!loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filterTodos}
                  selectedTodo={setSelectedTodoId}
                  selectTodoId={selectTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectTodoId !== 0 && (
        <TodoModal
          todoId={selectTodoId}
          todos={todos}
          selectedTodo={setSelectedTodoId}
        />
      )}
    </>
  );
};
