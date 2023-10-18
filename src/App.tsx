/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { FilterStatus } from './types/FilterStatus';

export const App: React.FC = () => {
  const [visibleToDos, setVisibleToDos] = useState<Todo[]>([]);
  const [filterStatus, setFilterStatus] = useState(FilterStatus.All);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const isMatch = (str: string) => str.toLowerCase().includes(query.toLowerCase());

  const getSelectedTodos = (todos: Todo[]) => {
    const filteredTodos = todos.filter(({ completed, title }) => {
      switch (filterStatus) {
        case FilterStatus.Active:
          return !completed && isMatch(title);

        case FilterStatus.Completed:
          return completed && isMatch(title);

        default:
          return isMatch(title);
      }
    });

    setVisibleToDos(filteredTodos);
  };

  const handleFilterSelect = (e:React.ChangeEvent<HTMLSelectElement>) => {
    const value = Object.values(FilterStatus).find(key => key === e.target.value);

    if (value) {
      setFilterStatus(value);
    }
  };

  useEffect(() => {
    getTodos()
      .then(todos => getSelectedTodos(todos));
  }, [filterStatus, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilterSelect={handleFilterSelect}
                selectValue={filterStatus}
                query={query}
                onQueryChange={setQuery}
              />
            </div>

            <div className="block">
              {visibleToDos.length || query
                ? (
                  <TodoList
                    todos={visibleToDos}
                    onTodoSelect={setSelectedTodo}
                    selectedTodo={selectedTodo}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onDeleteSelection={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
