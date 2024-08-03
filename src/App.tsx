import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { StatusFilterOptions } from './types/StatusFilterOptions';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [statusFilter, setStatusFilter] = useState<StatusFilterOptions>(StatusFilterOptions.All);
  const [titleFilter, setTitleFilter] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const filterTodos = (
    todosForFilter: Todo[],
    titleFilterValue: string,
    statusFilterValue: StatusFilterOptions,
  ) => {
    return todosForFilter.filter(todo => {
      let statusCorresponding = true;

      switch (statusFilterValue) {
        case StatusFilterOptions.Active:
          statusCorresponding = !todo.completed;
          break;
        case StatusFilterOptions.Completed:
          statusCorresponding = todo.completed;
          break;
        default:
          break;
      }

      return (
        todo.title.toLowerCase().includes(titleFilterValue.toLowerCase()) &&
        statusCorresponding
      );
    });
  };

  const filteredTodos = filterTodos(todos, titleFilter, statusFilter);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchInputValue={titleFilter}
                onChangeTitleFilter={setTitleFilter}
                onChangeStatusFilter={setStatusFilter}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  setSelectedTodo={setSelectedTodo}
                  selectedTodoId={selectedTodo?.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} setSelectedTodo={setSelectedTodo} />
      )}
    </>
  );
};
