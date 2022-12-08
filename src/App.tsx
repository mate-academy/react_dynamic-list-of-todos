/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosStatus, setTodosStatus] = useState<boolean | null>(null);
  const [todosQuery, setTodosQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const setterOfSelectedTodo = (pickedTodo: Todo | null) => {
    setSelectedTodo(pickedTodo);
  };

  const filterByStatus = (option: string) => {
    if (option === 'all') {
      setTodosStatus(null);
    }

    if (option === 'active') {
      setTodosStatus(false);
    }

    if (option === 'completed') {
      setTodosStatus(true);
    }
  };

  const filterByQuery = (query: string) => {
    setTodosQuery(query);
  };

  let filteredTodos = [...todos];

  if (todosStatus !== null) {
    filteredTodos = filteredTodos
      .filter(todoStatus => todoStatus.completed === todosStatus);
  }

  if (todosQuery.trim() !== '') {
    const lowerQuery = todosQuery.toLocaleLowerCase().trim();

    filteredTodos = filteredTodos
      .filter(todoQuery => todoQuery.title.toLocaleLowerCase().trim().includes(lowerQuery));
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterByStatus={filterByStatus}
                filterByQuery={filterByQuery}
                query={todosQuery}
              />
            </div>

            <div className="block">
              {todos.length
                ? (
                  <TodoList
                    todos={filteredTodos}
                    selectedTodo={selectedTodo}
                    setterOfSelectedTodo={setterOfSelectedTodo}
                  />
                )
                : (<Loader />)}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setterOfSelectedTodo={setterOfSelectedTodo}
        />
      )}
    </>
  );
};
