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

  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  const [filter, setFilter] = useState(Filter.ALL);
  const [query, setQuery] = useState('');

  const newModel = (newTodo: Todo) => {
    setUserId(newTodo.userId);

    return setSelectedTodoId(newTodo.id);
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
    setSelectedTodoId(null);
  };

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case Filter.ALL:
        return [...todos];

      case Filter.ACTIVE:
        return todos.filter(todo => !todo.completed);

      case Filter.COMPLETED:
        return todos.filter(todo => todo.completed);

      default:
        return [...todos];
    }
  }, [filter, todos]);

  const filterQuery = query
    ? filteredTodos.filter(todoQuery => todoQuery.title.toLowerCase().includes(query.toLowerCase().trim()))
    : filteredTodos;

  const selectedTodo = todos.find(todoToFind => todoToFind.id === selectedTodoId) || null;

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
                ? <TodoList todos={filterQuery} onSelect={newModel} selectedTodosId={selectedTodoId} />
                : <Loader /> }
            </div>
          </div>
        </div>
      </div>

      { (userId && selectedTodo) && <TodoModal userId={userId} todo={selectedTodo} onReset={onReset} />}
    </>
  );
};
