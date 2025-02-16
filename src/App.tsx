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
import { Status } from './types/Status';

function prepareVisibleTodos(todos: Todo[], query: string, filterBy: Status) {
  let visibleTodos: Todo[] = todos;

  if (query) {
    visibleTodos = visibleTodos.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (filterBy !== Status.All) {
    visibleTodos = visibleTodos.filter(item => {
      switch (filterBy) {
        case Status.Active:
          return !item.completed;
        case Status.Completed:
          return item.completed;
        default:
          return item;
      }
    });
  }

  return visibleTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState<string>('');
  const [filterBy, setFilterBy] = useState<Status>(Status.All);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const visibleTodos = prepareVisibleTodos(todos, query, filterBy);

  const handleSelect = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                setFilterBy={setFilterBy}
                filterBy={filterBy}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={visibleTodos}
                handleSelect={handleSelect}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          setSelectedTodo={setSelectedTodo}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};
