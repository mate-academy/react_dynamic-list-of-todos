import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { Options } from './types/Options';

function getFilteredTodos(
  todos: Todo[],
  query: string,
  selectedOption: Options,
) {
  let filteredTodos = [...todos];

  if (query) {
    const formattedQuery = query.trim().toLowerCase();

    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(formattedQuery),
    );
  }

  switch (selectedOption) {
    case Options.ACTIVE:
      return filteredTodos.filter(todo => !todo.completed);
    case Options.COMPLETED:
      return filteredTodos.filter(todo => todo.completed);
    default:
      return filteredTodos;
  }
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState(Options.ALL);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = getFilteredTodos(todos, query, selectedOption);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                selectedOption={selectedOption}
                onQuery={setQuery}
                onSelectOption={setSelectedOption}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  onSelectTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onSelectTodo={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
