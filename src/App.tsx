/* eslint-disable no-alert */
/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Filter } from './enum/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [userId, setUserId] = useState(0);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [filter, setFilter] = useState(Filter.ALL);
  const [query, setQuery] = useState('');

  const newModel = (newTodo: Todo) => {
    setUserId(newTodo.userId);

    return setSelectedTodo(newTodo);
  };

  useEffect(() => {
    getTodos()
      .then(data => {
        setTodos(data);
      })
      .catch(error => {
        alert(error);
      });
  }, []);

  const onReset = () => {
    setUserId(0);
    setSelectedTodo(null);
  };

  const filteredTodos = useMemo(() => {
    if (filter === Filter.ALL) {
      return [...todos];
    }

    if (filter === Filter.ACTIVE) {
      return todos.filter(todo => !todo.completed);
    }

    if (filter === Filter.COMPLETED) {
      return todos.filter(todo => todo.completed);
    }

    return [...todos];
  }, [filter, todos]);

  const filterQuery = query
    ? filteredTodos.filter(todoQuery => todoQuery.title.toLowerCase().includes(query.toLowerCase().trim()))
    : filteredTodos;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter setFilter={setFilter} setQuery={setQuery} query={query} />
            </div>

            <div className="block">
              {todos.length
                ? <TodoList todos={filterQuery} onSelect={newModel} selected={selectedTodo?.id} />
                : <Loader /> }
            </div>
          </div>
        </div>
      </div>

      { (userId && selectedTodo) && <TodoModal userId={userId} todo={selectedTodo} onReset={onReset} />}
    </>
  );
};
