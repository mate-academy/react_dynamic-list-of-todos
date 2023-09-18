/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import './App.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { getFilterTodo } from './services/services';
import { FilterType } from './services/variables';

export const App: React.FC = () => {
  const [hasModal, setHasModal] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [filterBy, setFilterBy] = useState(FilterType.All);
  const [query, setQuery] = useState('');

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId) as Todo;

  useEffect(() => {
    setisLoading(true);

    getTodos()
      .then((response) => {
        setTodos(response);
      })
      .catch((errorMessage) => {
        // eslint-disable-next-line
        console.log(errorMessage);
        setTodos([]);
      })
      .finally(() => setisLoading(false));
  }, []);

  const filteredTodos = getFilterTodo(query, filterBy, todos);

  return (
    <div className="App">
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                query={query}
                onSetQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoading && (
                <Loader />
              )}
              {!isLoading && (
                <TodoList
                  onShowModal={setHasModal}
                  todos={filteredTodos}
                  // onSetUser={setUser}
                  onSetSelectedTodoId={setSelectedTodoId}
                  selectedTodoId={selectedTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {hasModal && (
        <TodoModal
          onShowModal={setHasModal}
          selectedTodo={selectedTodo}
          onSetSelectedTodoId={setSelectedTodoId}
        />
      )}
    </div>
  );
};
