/* eslint-disable max-len */
import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';

import { getTodos } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [hasLoader, setHasLoader] = useState(false);
  const [modalTodo, setModalTodo] = useState<Todo>();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setHasLoader(true);
    getTodos()
      .then((response) => setTodoList(response))
      .finally(() => {
        setHasLoader(false);
      });
  }, []);

  const preparedTodos: Todo[] = useMemo(() => {
    let filteredList: Todo[];

    if (query.length) {
      filteredList = todoList.filter((todo) => {
        return todo.title.toLowerCase().includes(query.toLowerCase());
      });
    } else {
      filteredList = todoList;
    }

    switch (filter) {
      case 'active':
        return filteredList.filter(item => !item.completed);

      case 'completed':
        return filteredList.filter(item => item.completed);

      default:
        return filteredList;
    }
  }, [query, filter, todoList]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                filter={filter}
                setQuery={(newQuery) => setQuery(newQuery)}
                setFilter={(newFilter) => setFilter(newFilter)}
              />
            </div>

            <div className="block">
              {hasLoader && <Loader />}
              <TodoList
                todos={preparedTodos}
                setTodo={(todo) => setModalTodo(todo)}
                modalTodo={modalTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {modalTodo && (
        <TodoModal
          todo={modalTodo}
          clearModal={() => setModalTodo(undefined)}
        />
      )}
    </>
  );
};
