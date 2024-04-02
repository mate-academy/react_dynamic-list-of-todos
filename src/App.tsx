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
import { FilterCriteria, Select, Status } from './types/otherTypes';

const filterTodos = (
  todos: Todo[],
  { status, searchInput }: FilterCriteria,
): Todo[] => {
  return todos.filter(todo => {
    if (status === Status.Active && todo.completed) {
      return false;
    }

    if (status === Status.Completed && !todo.completed) {
      return false;
    }

    if (
      searchInput &&
      !todo.title.toLowerCase().includes(searchInput.toLowerCase())
    ) {
      return false;
    }

    return true;
  });
};

export const App: React.FC = () => {
  const [isTodosLoading, setIsTodosLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Select>(null);
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterCriteria>({
    status: Status.All,
    searchInput: '',
  });

  useEffect(() => {
    setIsTodosLoading(true);
    getTodos()
      .then((todos: Todo[]) => {
        const filteredTodos = filterTodos(todos, filter);

        setTodosFromServer(filteredTodos);
      })
      .finally(() => {
        setIsTodosLoading(false);
      });
  }, [filter]);

  const handleFilterChange = (filterCriteria: FilterCriteria) => {
    setFilter(filterCriteria);
  };

  const handleSelectedTodo = (selectedTodoChange: Select) => {
    setSelectedTodo(selectedTodoChange);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onFilterChange={handleFilterChange} />
            </div>

            <div className="block">
              {isTodosLoading && <Loader />}

              {!isTodosLoading && (
                <TodoList
                  todos={todosFromServer}
                  selectedTodo={selectedTodo}
                  onSelect={handleSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} onSelect={handleSelectedTodo} />
      )}
    </>
  );
};
