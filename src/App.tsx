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

const filterTodos = (todos: Todo[], filter: Filter): Todo[] => {
  switch (filter) {
    case 'active':
      return todos.filter(td => td.completed === false);
    case 'completed':
      return todos.filter(td => td.completed === true);
    default:
      return todos;
  }
};

const filterByTitle = (todos: Todo[], query: string) =>
  todos.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<Filter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(tds => {
        setTodos(tds);
        setFilteredTodos(tds);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const filtered = filterTodos(todos, filter);

    setFilteredTodos(filterByTitle(filtered, searchQuery));
  }, [todos, filter, searchQuery]);

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
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                selectedTodo={todo}
                todos={filteredTodos}
                setTodo={setTodo}
                isActive={isActive}
                setActive={setActive}
              />
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        isActive={isActive}
        setActive={setActive}
        todo={todo ?? undefined}
      />
    </>
  );
};
