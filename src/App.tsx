/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoStatus } from './types/TodoStatus';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todoStatus, setTodoStatus] = useState(TodoStatus.ALL);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(setTodos);
  }, []);

  const getVisibleTodos = () => {
    return todos.filter(todo => {
      const normalizedQuery = query.toLocaleLowerCase();

      switch (todoStatus) {
        case TodoStatus.ALL:
          return todo.title.includes(normalizedQuery);

        case TodoStatus.ACTIVE:
          return !todo.completed && todo.title.includes(normalizedQuery);

        case TodoStatus.COMPLETED:
          return todo.completed && todo.title.includes(normalizedQuery);

        default:
          return todo;
      }
    });
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onChangeStatusTodos={setTodoStatus}
                todoStatus={todoStatus}
                onChangeQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {todos.length === 0
                ? <Loader />
                : (
                  <TodoList
                    todos={getVisibleTodos()}
                    onShowInfo={setSelectedTodo}
                    selectedTodo={selectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onCloseInfo={setSelectedTodo}
        />
      )}
    </>
  );
};
