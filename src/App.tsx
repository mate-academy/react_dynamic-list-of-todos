/* eslint-disable max-len */
import React, { useMemo, useEffect, useState } from 'react';
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
  const [completedFilter, setCompletedFilter] = useState('all');
  const [todoSelectedId, setTodoSelectedId] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArraySelection = useMemo(() => {
    return todos.filter(todo => {
      const checkQuery = todo.title.toLowerCase().includes(searchQuery);

      switch (completedFilter) {
        case 'all':
          return checkQuery;
        case 'active':
          return checkQuery && !todo.completed;
        case 'completed':
          return checkQuery && todo.completed;
        default:
          return true;
      }
    });
  }, [todos, searchQuery, completedFilter]);

  const onClose = () => {
    setTodoSelectedId(0);
  };

  const todo = todos.find(element => element.id === todoSelectedId) || null;

  useEffect(() => {
    getTodos().then(result => {
      setTodos(result);
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
                onFilterSelected={setCompletedFilter}
                textInput={setSearchQuery}
              />
            </div>

            <div className="block">
              {todos.length > 0
                ? (
                  <TodoList
                    todos={filteredArraySelection}
                    onTodoSelect={setTodoSelectedId}
                    todoSelectedId={todoSelectedId}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>
      {todoSelectedId !== 0
        && (
          <TodoModal
            todo={todo}
            onClose={onClose}
          />
        )}
    </>
  );
};
