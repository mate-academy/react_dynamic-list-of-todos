/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './main.scss';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

function getPreparedTodos(todos: Todo[], filter: Filter, query: string): Todo[] {
  let preparedTodos;

  switch (filter) {
    case Filter.ACTIVE:
      preparedTodos = todos.filter(todo => !todo.completed);
      break;
    case Filter.COMPLETED:
      preparedTodos = todos.filter(todo => todo.completed);
      break;
    default:
      preparedTodos = todos;
  }

  if (query) {
    preparedTodos = preparedTodos.filter(todo => {
      return todo.title.toLowerCase().includes(query.toLowerCase());
    });
  }

  return preparedTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(false);
  const [filterBy, setFilterBy] = useState<Filter>(Filter.ALL);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const preparedTodos = getPreparedTodos(todos, filterBy, query);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filterBy}
                setFilter={setFilterBy}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading && (
                <Loader />
              )}
              {!loading && todos.length > 0 && (
                <TodoList
                  todos={preparedTodos}
                  selectedTodoId={selectedTodo ? selectedTodo.id : 0}
                  setSelectedTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          hideModal={setSelectedTodo}
        />
      )}
    </>
  );
};
