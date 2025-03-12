/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo, TodoCondition } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [todoCondition, setTodoCondition] = useState<TodoCondition>('all');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    getTodos()
      .then(setTodos)
      .then(() => setLoader(false));
  }, []);

  const visibleTodos = useMemo(() => {
    let filteredTodos = todos.filter(todo =>
      todo.title.toLowerCase().includes(searchValue.trim().toLowerCase()),
    );

    switch (todoCondition) {
      case 'active':
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;
      case 'completed':
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    return filteredTodos;
  }, [todos, searchValue, todoCondition]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                changeSearchValue={setSearchValue}
                changeCondition={setTodoCondition}
                searchValue={searchValue}
              />
            </div>

            <div className="block">
              {loader && <Loader />}
              {todos && (
                <TodoList
                  todos={visibleTodos}
                  activeTodo={activeTodo}
                  setTodo={setActiveTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {activeTodo && <TodoModal todo={activeTodo} setTodo={setActiveTodo} />}
    </>
  );
};
