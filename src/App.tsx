import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { FilterMethods } from './types/FilterMethods';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterMethod, setFilterMethod] = useState('');
  const [query, setQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Error server connect. Try again later'))
      .finally(() => setLoading(false));
  }, []);

  function getFilteredTodos() {
    const filteredTodos = todos.filter(
      todo => todo.title.toLowerCase().includes(query.toLowerCase()),
    );

    switch (filterMethod) {
      case FilterMethods.ACTIVE:
        return filteredTodos.filter(todo => !todo.completed);

      case FilterMethods.COMPLETED:
        return filteredTodos.filter(todo => todo.completed);

      case FilterMethods.ALL:
      default:
        return filteredTodos;
    }
  }

  const filteredTodos = getFilteredTodos();
  const amountOfTodos = filteredTodos.length;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">
              {errorMessage || `Total Todos: ${amountOfTodos}`}
            </h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={setQuery}
                onSelectFilterMethod={setFilterMethod}
              />
            </div>

            <div className="block">
              {loading && (
                <Loader />
              )}

              {!!amountOfTodos && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  onSelectTodo={setSelectedTodo}
                />
              )}

              {!loading && !amountOfTodos && !errorMessage && (
                <p>No Todos matching your request</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onCloseModal={setSelectedTodo}
        />
      )}
    </>
  );
};
