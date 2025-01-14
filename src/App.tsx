/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { SelectOptions } from './types/SelectOptions';

function getFilteredTodos(
  todos: Todo[],
  query: string,
  selectedOption: SelectOptions,
) {
  let copyTodos = [...todos];

  if (query) {
    const formattedQuery = query.trim().toLowerCase();

    copyTodos = copyTodos.filter(todo =>
      todo.title.toLowerCase().includes(formattedQuery),
    );
  }

  switch (selectedOption) {
    case SelectOptions.ALL:
      break;
    case SelectOptions.ACTIVE:
      copyTodos = copyTodos.filter(todo => !todo.completed);
      break;
    case SelectOptions.COMPLETED:
      copyTodos = copyTodos.filter(todo => todo.completed);
      break;
  }

  return copyTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState(SelectOptions.ALL);
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
                onQuery={newQuery => setQuery(newQuery)}
                onSelectOption={newOption => setSelectedOption(newOption)}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  onSelectTodo={newTodo => setSelectedTodo(newTodo)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onSelectTodo={nothing => setSelectedTodo(nothing)}
        />
      )}
    </>
  );
};
