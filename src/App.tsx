/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { SelectStatus } from './types/SelectStatus';
import { FilterParams } from './types/FilterParams';

const getPrepearedTodos = (todos: Todo[], filterParsms: FilterParams) => {
  let prepearedTodos = [...todos];

  if (filterParsms.query.trim() || filterParsms.status) {
    prepearedTodos = prepearedTodos.filter(todo => {
      const matchingTitle = todo.title
        .toLowerCase()
        .includes(filterParsms.query.trim().toLowerCase());

      let matchingStatus: boolean;

      switch (filterParsms.status) {
        case SelectStatus.ACTIVE:
          matchingStatus = !todo.completed;
          break;
        case SelectStatus.COMPLETED:
          matchingStatus = todo.completed;
          break;
        default:
          matchingStatus = true;
      }

      return matchingTitle && matchingStatus;
    });
  }

  return prepearedTodos;
};

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterParsms, setFilterParams] = useState<FilterParams>({
    query: '',
    status: SelectStatus.ALL,
  });

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(todosFromServer => setTodos(todosFromServer))
      .finally(() => setIsLoading(false));
  }, []);

  const prepearedTodos = getPrepearedTodos(todos, filterParsms);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterParsms={filterParsms}
                setFilterParams={setFilterParams}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={prepearedTodos}
                  selectTodo={setSelectedTodo}
                  selectedTodoId={selectedTodo?.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} close={() => setSelectedTodo(null)} />
      )}
    </>
  );
};
