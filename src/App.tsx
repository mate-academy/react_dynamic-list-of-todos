/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilterCase } from './types/Filter';

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterBy, setFilterBy] = useState<FilterCase>(FilterCase.All);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => {
        throw new Error('Error. Please try again later');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos: Todo[] = useMemo(() => {
    let copyTodos = [...todos];

    if (query) {
      copyTodos = copyTodos.filter((todo) => todo.title.toLowerCase().includes(query.toLowerCase()));
    }

    switch (filterBy) {
      case FilterCase.Active:
        return copyTodos.filter((todo) => !todo.completed);

      case FilterCase.Completed:
        return copyTodos.filter((todo) => todo.completed);

      default:
        return copyTodos;
    }
  }, [query, filterBy, todos]);

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
              />
            </div>

            <div className="block">
              {isLoading ? <Loader /> : (

                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
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
          setTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
