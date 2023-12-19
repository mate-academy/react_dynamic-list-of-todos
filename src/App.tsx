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
import { Filter } from './types/Filter';

function finalTodos(todos: Todo[], filter:Filter, query:string):Todo[] {
  let result;

  switch (filter) {
    case 'active':
      result = todos?.filter(todo => todo.completed === false);
      break;
    case 'completed':
      result = todos?.filter(todo => todo.completed === true);
      break;
    default:
      result = todos;
      break;
  }

  result = result.filter(todo => todo.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    || todo.id === +query);

  return result;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<Filter>('all');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setFilteredTodos(finalTodos(todos, filter, query));
  }, [todos, filter, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                setFilter={setFilter}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList todos={filteredTodos} selectedTodo={selectedTodo} setSelectedTodo={setSelectedTodo} />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo
        && <TodoModal selectedTodo={selectedTodo} setSelectedTodo={setSelectedTodo} />}
    </>
  );
};
