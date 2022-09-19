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
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loader, setLoader] = useState(false);
  const [todoId, setTodoId] = useState(0);
  const [statusFilter, setStatusFilter] = useState('all');
  const [textFilter, setTextFilter] = useState('');

  const uploadTodos = async () => {
    const uploadedTodos = await getTodos();

    setTodos(uploadedTodos);
    setLoader(true);
  };

  uploadTodos();

  const filtered = todos.filter(todoo => {
    switch (statusFilter) {
      case 'active':
        return !todoo.completed;

      case 'completed':
        return todoo.completed;

      default:
        return true;
    }
  });

  const visibleTodos = filtered.filter(todoo => {
    return todoo.title.toLowerCase().includes(textFilter.toLowerCase());
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
                value={statusFilter}
                setValue={setStatusFilter}
                text={textFilter}
                setText={setTextFilter}
              />
            </div>

            <div className="block">
              {!loader
                ? (<Loader />)
                : (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodoId={todoId}
                    selectTodo={(todo) => setTodoId(todo)}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {todoId !== 0
        && (
          <TodoModal
            todoId={todoId}
            todos={visibleTodos}
            selectTodo={(todo) => setTodoId(todo)}
          />
        )}
    </>
  );
};
