/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

const filterDefaulfValue = {
  status: 'all',
  query: '',
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo>();
  const [filterValue, setFilterValue] = useState(filterDefaulfValue);

  useEffect(() => {
    getTodos().then(data => {
      setTodos(data);
      setLoading(false);
    });
  });

  useMemo(() => {
    const { status, query } = filterValue;
    const normalizedQuery = query.toLowerCase();

    setFilteredTodos(
      todos.filter(todo => {
        return (
          (status === 'completed'
            ? todo.completed
            : status === 'active'
              ? !todo.completed
              : true) && todo.title.toLowerCase().includes(normalizedQuery)
        );
      }),
    );
  }, [filterValue, todos]);

  const onSelectHandler = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const onCloseHandler = () => {
    setSelectedTodo(undefined);
  };

  const onSelectChangeHandler = (value: string) => {
    setFilterValue({ ...filterValue, status: value });
  };

  const onQueryChangeHandler = (value: string) => {
    setFilterValue({ ...filterValue, query: value });
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelectChange={onSelectChangeHandler}
                onQueryChange={onQueryChangeHandler}
                query={filterValue.query}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={filteredTodos}
                selectedTodoId={selectedTodo?.id}
                onSelect={onSelectHandler}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={onCloseHandler} />
      )}
    </>
  );
};
