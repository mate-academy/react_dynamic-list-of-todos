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
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentQuery, setCurrentQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)

  const [filteringOptions, setFilteringOptions] = useState('All');

  const onModalClose = () => {
    setSelectedTodoId(0);
    setSelectedUserId(0);
  };

  useEffect(() => {
    getTodos()
      .then(response => setTodos(response));
  }, []);

  useEffect(() => {
   setSelectedTodo (() => todos
      .find(todo => todo.id === selectedTodoId) || null);
  }, [selectedTodoId])

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                currentQuery={currentQuery}
                onFilterChange={setFilteringOptions}
                onInputChange={setCurrentQuery}
              />
            </div>

            <div className="block">
              {todos.length > 0
                ? (
                  <TodoList
                    currentQuery={currentQuery}
                    filteringOptions={filteringOptions}
                    todoItems={todos}
                    onSelectTodo={setSelectedTodoId}
                    onUserSelect={setSelectedUserId}
                    selectedTodoId={selectedTodoId}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {selectedUserId && selectedTodo && (
        <TodoModal
          selectedUserTodo={selectedTodo}
          selectedUserId={selectedUserId}
          onModalClose={onModalClose}
        />
      )}
    </>
  );
};
