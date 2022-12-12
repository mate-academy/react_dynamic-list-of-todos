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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todoStatus, setTodoStatus] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(setTodos);
  }, []);

  let filteredTodos = todos.filter(todo => {
    switch (todoStatus) {
      case 'all':
        return todo;

      case 'active':
        return !todo.completed;

      case 'completed':
        return todo.completed;

      default:
        throw new Error('Incorrect todoStatus');
    }
  });

  filteredTodos = filteredTodos.filter(todo => {
    const normalizedQuery = query.toLocaleLowerCase();
    const normalizedTitle = todo.title.toLocaleLowerCase();

    return (
      normalizedTitle.includes(normalizedQuery)
    );
  });

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
              {!todos.length
                ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodos}
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
