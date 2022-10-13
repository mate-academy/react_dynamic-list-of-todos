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
import { Filter } from './types/Filter';

const defaultTodo: Todo = {
  id: 0,
  title: '',
  completed: false,
  userId: 0,
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([defaultTodo]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(defaultTodo);
  const [todoSelected, setTodoSelected] = useState(false);
  const [filterBy, setFilterBy] = useState<Filter>(Filter.All);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(todosAPI => setTodos(todosAPI))
      .then(() => setLoading(false));
  }, []);

  const selectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setTodoSelected(true);
  };

  const unsetSelectedTodo = () => {
    setTodoSelected(false);
    setSelectedTodo(defaultTodo);
  };

  const setFilter = (filter: Filter) => {
    setFilterBy(filter);
  };

  const setQueryFilter = (value: string) => {
    setQuery(value);
  };

  const visibleTodos = todos.filter((todo) => {
    switch (filterBy) {
      case Filter.Active:
        return !todo.completed;
      case Filter.Completed:
        return todo.completed;
      default:
        return true;
    }
  }).filter((todo) => {
    return todo.title.toLocaleLowerCase().includes(query.toLowerCase());
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilterSelect={setFilter}
                setQuery={setQueryFilter}
                query={query}
              />
            </div>

            <div className="block">
              { loading
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    selectTodo={selectTodo}
                    selectedTodo={selectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {todoSelected && (
        <TodoModal todo={selectedTodo} unsetSelectedTodo={unsetSelectedTodo} />
      )}
    </>
  );
};
