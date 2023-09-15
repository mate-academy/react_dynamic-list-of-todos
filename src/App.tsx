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
import { User } from './types/User';
import { getTodos } from './api';
import { handleFilterTodo } from './services/services';

export const App: React.FC = () => {
  const [hasModal, setHasModal] = useState(false);
  const [hasLoader, setHasLoader] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [filterBy, setFilterBy] = useState('all');
  const [query, setQuery] = useState('');

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId);

  useEffect(() => {
    getTodos().then((response) => {
      setTodos(response);
    })
      .catch((errorMessage) => {
        // eslint-disable-next-line
        console.log(errorMessage);
        setTodos([]);
      })
      .finally(() => setHasLoader(false));
  }, []);

  const filteredTodos = handleFilterTodo(query, filterBy, todos);

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
              {hasLoader && (
                <Loader />
              )}
              <TodoList
                onShowModal={setHasModal}
                todos={filteredTodos}
                onSetUser={setUser}
                onSetSelectedTodoId={setSelectedTodoId}
                selectedTodoId={selectedTodoId}
              />
            </div>
          </div>
        </div>
      </div>

      {hasModal && (
        <TodoModal
          user={user}
          onShowModal={setHasModal}
          selectedTodo={selectedTodo}
          selectedTodoId={selectedTodoId}
          onSetSelectedTodoId={setSelectedTodoId}
        />
      )}
    </div>
  );
};
