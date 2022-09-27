/* eslint-disable max-len */
import { FC, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [todoId, setTodoId] = useState(0);
  const [filterType, setFilterType] = useState('all');
  const [queryFilter, setQueryFilter] = useState('');

  useEffect(() => {
    getTodos()
      .then((response) => {
        setTodos(response);
        setIsLoading(false);
      });
  }, []);

  const filteredTodos = todos
    .filter(todoItem => {
      switch (filterType) {
        case 'active':
          return !todoItem.completed;

        case 'completed':
          return todoItem.completed;

        default:
          return true;
      }
    });

  const visibleTodos = filteredTodos.filter(todoItem => {
    return todoItem.title.toLowerCase().includes(queryFilter.toLowerCase());
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                value={filterType}
                setValue={setFilterType}
                query={queryFilter}
                setQuery={setQueryFilter}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
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
      {todoId !== 0 && (
        <TodoModal
          todoId={todoId}
          todos={visibleTodos}
          selectTodo={(todo) => setTodoId(todo)}
        />
      )}
    </>
  );
};
