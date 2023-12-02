/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

enum Status {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<string>(Status.all);
  const [isLoad, setIsLoad] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [selectedModalTodo, setSelectedModalTodo] = useState<Todo | null>(null);

  const filteredTodosByStatus = useMemo(() => {
    return todos.filter(todo => {
      if (status === Status.active) {
        return !todo.completed;
      }

      if (status === Status.completed) {
        return todo.completed;
      }

      return true;
    }).filter(todo => todo.title.toLowerCase().trim().includes(searchInput));
  }, [todos, status, searchInput]);

  // const visibleTodos = () => {
  //   return filteredTodosByStatus.filter(todo => todo.title.toLowerCase().trim().includes(searchInput))
  //     || filteredTodosByStatus;
  // };

  useEffect(() => {
    getTodos().then(todoList => setTodos(todoList)).finally(() => setIsLoad(false));
  }, []);

  const filteredByMatch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value.trimStart());

    return filteredTodosByStatus.filter(todo => todo.title.includes(event.target.value.toLowerCase().trim()));
  };

  const resetSearchInput = () => {
    setSearchInput('');
  };

  const closeModal = () => {
    setSelectedModalTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onChangeStatus={event => setStatus(event.target.value)}
                inputValue={searchInput}
                onChangeInput={filteredByMatch}
                onClickReset={resetSearchInput}
              />
            </div>

            <div className="block">
              <TodoList
                todos={filteredTodosByStatus}
                getUserAction={setSelectedModalTodo}
                selectedTodo={selectedModalTodo}
              />
              {isLoad && (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedModalTodo && (
        <TodoModal
          selectedTodo={selectedModalTodo}
          actionClose={closeModal}
          changeSelectedTodo={setSelectedModalTodo}
        />
      )}
    </>
  );
};
