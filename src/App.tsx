/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { getTodos } from './api';
import { CompletedStatus } from './types/CompletedStatus';
export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<CompletedStatus>(
    CompletedStatus.all,
  );

  let flag = null;

  if (filterStatus !== CompletedStatus.all) {
    flag = filterStatus === CompletedStatus.completed ? true : false;
  }

  const filteredTodos = todos.filter(todo => {
    return (
      todo.title.toLowerCase().includes(query.toLowerCase()) &&
      (todo.completed === flag || flag === null)
    );
  });

  useEffect(() => {
    setIsLoading(true);
    getTodos().then(response => {
      setTodos(response);
      setIsLoading(false);
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
                query={query}
                setQuery={setQuery}
                setFilterStatus={setFilterStatus}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={filteredTodos}
                selectedTodoId={selectedTodoId}
                setSelectedTodoId={setSelectedTodoId}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId && (
        <TodoModal
          todos={todos}
          selectedTodoId={selectedTodoId}
          onClose={setSelectedTodoId}
        />
      )}
    </>
  );
};
