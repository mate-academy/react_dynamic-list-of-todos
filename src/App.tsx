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
import { FilterTodos } from './types/FilterTodos';

type FilterObject = {
  query: string;
  filterParameter?: FilterTodos | string;
};

const prepareTodos = (todos: Todo[], { query, filterParameter }: FilterObject) => {
  let todosCopy = [...todos];

  if (query) {
    todosCopy = todosCopy.filter(todo => {
      return todo.title.toLowerCase().includes(query.trim().toLowerCase());
    });
  }

  if (filterParameter !== FilterTodos.All) {
    todosCopy = todosCopy.filter(todo => {
      switch (filterParameter) {
        case FilterTodos.Active:
          return !todo.completed;

        case FilterTodos.Completed:
          return todo.completed;

        default:
          return todo;
      }
    });
  }

  return todosCopy;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState<string>('');
  const [filterParameter, setFilterParameter] = useState<FilterTodos | string>(FilterTodos.All);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const preparedTodos = prepareTodos(todos, { query, filterParameter });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                filterParameter={filterParameter}
                onInputChange={setQuery}
                onSelectChange={setFilterParameter}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              <TodoList
                todos={preparedTodos}
                selectedTodo={selectedTodo}
                setSelectedTodo={setSelectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
