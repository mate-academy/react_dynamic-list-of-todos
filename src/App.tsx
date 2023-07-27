/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { FilterBy } from './types/FilterBy';
import { getTodos } from './api';

export const App: React.FC = () => {
  // const todoByDefault: Todo = {
  //   userId: 0,
  //   id: 0,
  //   title: '',
  //   completed: false,
  // };

  const [todo, setTodo] = useState({} as Todo);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState<FilterBy>('all');
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(someTodos => {
        setTodos(someTodos);
      })
      .finally(() => setLoading(false));
  }, []);

  let preparedTodos = [...todos];

  useMemo(() => {
    const lowerCaseQuery = query.toLocaleLowerCase();

    if (query) {
      preparedTodos = preparedTodos.filter(
        someTodo => someTodo.title.toLowerCase().includes(lowerCaseQuery),
      );
    }

    switch (filterBy) {
      case 'active':
        preparedTodos = preparedTodos.filter(someTodo => !someTodo.completed);
        break;

      case 'completed':
        preparedTodos = preparedTodos.filter(someTodo => someTodo.completed);
        break;

      default:
        preparedTodos = [...preparedTodos];
    }
  }, [query, filterBy, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Title</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                setFilterBy={setFilterBy}
              />
            </div>

            <div className="block">
              {loading
                ? (
                  <Loader />
                ) : (
                  <TodoList
                    todo={todo}
                    setTodo={setTodo}
                    todos={preparedTodos}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {todo.id && (
        <TodoModal
          todo={todo}
          setTodo={setTodo}
        />
      )}
    </>
  );
};
