import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoId, setTodoId] = useState(0);

  /* ---------For TodoFilter--------------- */
  const [query, setQuery] = useState('');
  const [certainTypeTodos, setCertainTypeTodos] = useState('all');

  const handlSelectedTodos = async (event: { target: { value: string; }; }) => {
    setCertainTypeTodos(event.target.value);
  };

  const handleSetQuery = async (event: { target: { value: string; }; }) => {
    setQuery(event.target.value.toLowerCase());
  };

  const handleUserIdBtn = async (userIdFromTodo: number) => {
    setTodoId(userIdFromTodo);
  };

  const selectedBy = todos.filter((todo: Todo) => {
    switch (certainTypeTodos) {
      case 'all':
        return todo;
      case 'active':
        return todo.completed === false;
      case 'completed':
        return todo.completed === true;
      default:
        return todo;
    }
  });

  const visibleTodos = selectedBy.filter((todo) => {
    return todo.title.toLowerCase().includes(query);
  });

  const resetQuery = async () => {
    setQuery('');
  };

  const resetTodoId = async () => {
    setTodoId(0);
  };

  useEffect(() => {
    getTodos().then(todosFromServer => setTodos(todosFromServer));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectEl={certainTypeTodos}
                selectedTodos={handlSelectedTodos}
                query={query}
                resetQuery={resetQuery}
                filter={handleSetQuery}
              />
            </div>

            <div className="block">
              {todos.length === 0 ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  resetTodoId={resetTodoId}
                  selectTodoId={todoId}
                  selectTodo={handleUserIdBtn}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
