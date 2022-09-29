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
import { FilterType } from './types/Filter';

export function checkQueryInTitle(title: string, query: string) {
  return title.toLocaleLowerCase().includes(query.toLocaleLowerCase());
}

export function getFilteredTodo(
  todos: Todo[],
  filterType: FilterType,
  query: string,
) {
  return todos.filter(({title, completed}) => {
    switch (filterType) {
      case 'active':
        return !completed && checkQueryInTitle(title, query);

      case 'completed':
        return completed && checkQueryInTitle(title, query);

      default:
        return checkQueryInTitle(title, query);
    }
  });
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setselectedTodoId] = useState(0);
  const [filterBy, setFilterBy] = useState(FilterType.ALL);
  const [query, setQuery] = useState('');
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const todosFromServer = await getTodos();

      setLoading(false);

      setTodos(todosFromServer);
    };

    fetchData();
  }, []);

  const filteredTodos = getFilteredTodo(todos, filterBy, query);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilterBy={setFilterBy}
                filterBy={filterBy}
                setQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodos}
                    selectedTodoIdId={selectedTodoId}
                    setselectedTodoId={setselectedTodoId}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId
        && (
          <TodoModal
            todos={todos}
            selectedTodoId={selectedTodoId}
            setselectedTodoId={setselectedTodoId}
          />
        )}
    </>
  );
};
