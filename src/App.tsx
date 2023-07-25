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
import { FilteredFields } from './types/FilteredFields';

type FilterObject = {
  query: string;
  filteredField?: FilteredFields | string;
};

function prepareString(str: string) {
  return str.toLowerCase().trim();
}

const prepareTodos = (todos: Todo[], { query, filteredField }: FilterObject) => {
  let todosCopy = [...todos];

  if (query) {
    const preparedQuery = prepareString(query);

    todosCopy = todosCopy.filter(
      todo => prepareString(todo.title).includes(preparedQuery),
    );
  }

  if (filteredField !== FilteredFields.All) {
    todosCopy = todosCopy.filter(todo => {
      switch (filteredField) {
        case FilteredFields.Active:
          return !todo.completed;
        case FilteredFields.Completed:
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
  const [filteredField, setFilteredField] = useState<FilteredFields | string>(FilteredFields.All);

  useEffect(() => {
    setLoading(true);
    getTodos().then(setTodos).finally(() => setLoading(false));
  }, []);

  const preparedTodos = prepareTodos(todos, { query, filteredField });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onChangeInput={setQuery}
                filteredField={filteredField}
                onChangeSelect={setFilteredField}
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
