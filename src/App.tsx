import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Status } from './types/Status';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const filteredQueryInput = (
  comparedTodos: Todo[],
  query: string,
): Todo[] => {
  if (query) {
    return comparedTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  return comparedTodos;
};

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getTodos().then(data => {
      setTodos(data);
      setIsLoading(false);
    });
  }, []);

  let comparedTodos = todos;

  switch (filter) {
    case Status.Active:
      comparedTodos = comparedTodos.filter(todo => !todo.completed);
      break;
    case Status.Completed:
      comparedTodos = comparedTodos.filter(todo => todo.completed);
      break;
    default:
      break;
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilter={setFilter}
                setQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredQueryInput(comparedTodos, query)}
                  setSelectedTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
