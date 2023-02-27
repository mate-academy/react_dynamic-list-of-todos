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
import { FilterTodos } from './types/FilterTodos';

const filterTodos:FilterTodos = (todos, query, completedStatus) => {
  let prepearedTodos = [...todos];

  if (query.trim()) {
    prepearedTodos = prepearedTodos.filter(todo => {
      const normalizedTitle = todo.title.toLowerCase();
      const normalizedQuery = query.toLowerCase().trim();

      return normalizedTitle.includes(normalizedQuery);
    });
  }

  prepearedTodos = prepearedTodos.filter(todo => {
    switch (completedStatus) {
      case TodoStatus.Active:
        return !todo.completed;
      case TodoStatus.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  return prepearedTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedStatus, setCompletedStatus] = useState<TodoStatus>(TodoStatus.All);
  const [query, setQuery] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState(0);

  const getTodosFromServer = async () => {
    const todosFromServer = await getTodos();

    setTodos(todosFromServer);
  };

  const defineStatus = (value:TodoStatus) => {
    setCompletedStatus(value);
  };

  const getQuery = (value:string) => {
    setQuery(value);
  };

  const defineSelectedId = (value: number) => {
    setSelectedTodoId(value);
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  const visibleTodos = filterTodos(todos, query, completedStatus);
  const selectedTodo = todos.find(todo => todo.id === selectedTodoId);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={completedStatus}
                defineStatus={defineStatus}
                query={query}
                getQuery={getQuery}
              />
            </div>

            <div className="block">

              {todos.length
                ? (
                  <TodoList
                    todos={visibleTodos}
                    defineSelectedId={defineSelectedId}
                    selectedTodoId={selectedTodoId}
                  />
                )
                : <Loader />}

            </div>
          </div>
        </div>
      </div>
      {selectedTodo
      && (
        <TodoModal
          defineSelectedId={defineSelectedId}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};
