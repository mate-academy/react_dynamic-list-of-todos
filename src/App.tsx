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
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>(() => {
    return getTodos()
      .then(response => setTodos(response));
  });
  const [currentQuery, setCurrentQuery] = useState('');

  const [filteringOptions, setFilteringOptions] = useState('All');

  const onModalClose = () => {
    setSelectedTodoId(0);
    setSelectedUserId(0);
  };

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

      {selectedUserId && (
        <TodoModal
          todos={todos}
          selectedTodoId={selectedTodoId}
          selectedUserId={selectedUserId}
          onModalClose={onModalClose}
        />
      )}
    </>
  );
};
