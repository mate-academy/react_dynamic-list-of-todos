/* eslint-disable max-len */
import { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Filter } from './types/Filter';

const getVisibleTodos = (todos: Todo[], filter: Filter, query: string): Todo[] => {
  let copyTodos = [...todos];

  copyTodos = copyTodos.filter(todo => {
    switch (filter) {
      case Filter.All:
        return true;

      case Filter.Active:
        return !todo.completed;

      case Filter.Completed:
        return todo.completed;

      default:
        return true;
    }
  });

  if (query) {
    const trimmedQuery = query.trim().toLowerCase();

    copyTodos = copyTodos.filter(todo => todo.title.toLowerCase().includes(trimmedQuery));
  }

  return copyTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(Filter.All);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const visibleTodos = getVisibleTodos(todos, filter, query);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

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
              {loading && (
                <Loader />
              )}

              {!loading && todos.length > 0 && (
                <TodoList
                  todos={visibleTodos}
                  onClickModal={setSelectedTodo}
                  selectedTodo={selectedTodo?.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo
      && (
        <TodoModal
          todo={selectedTodo}
          onCloseModal={setSelectedTodo}
        />
      )}
    </>
  );
};
