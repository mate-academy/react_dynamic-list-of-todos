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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [queryFilter, setQueryFilter] = useState('');
  const [selectStatus, setSelectStatus] = useState('all');
  const [todoId, setTodoId] = useState(0);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setIsLoading(false);
      });
  }, []);

  const filterBy = todos.filter((todo) => {
    switch (selectStatus) {
      case 'active':
        return !todo.completed;

      case 'completed':
        return todo.completed;

      default:
        return true;
    }
  });

  const visibleTodos = filterBy.filter(todoItem => {
    return todoItem.title
      .toLocaleLowerCase()
      .includes(queryFilter.toLocaleLowerCase());
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectStatus={selectStatus}
                setSelectStatus={setSelectStatus}
                query={queryFilter}
                setQuery={setQueryFilter}
              />
            </div>

            <div className="block">
              {isLoading
                ? (
                  <Loader />
                ) : (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodoId={todoId}
                    selectedTodo={todo => setTodoId(todo)}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {todoId && (
        <TodoModal
          todos={visibleTodos}
          todoId={todoId}
          selectedTodo={todo => setTodoId(todo)}
        />
      )}
    </>
  );
};
