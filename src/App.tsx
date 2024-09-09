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
import { FilterCompleted } from './types/FilterCompleted';

type Filter = {
  completed: FilterCompleted;
  query: string;
};

function getFilteredTodos(todos: Todo[], filter: Filter): Todo[] {
  const filteredTodos = todos.filter(todo => {
    const searchStringFilterCheck = todo.title.includes(filter.query);

    switch (filter.completed) {
      case 'active':
        return searchStringFilterCheck && !todo.completed;

      case 'completed':
        return searchStringFilterCheck && todo.completed;

      case 'all':
      default:
        return searchStringFilterCheck;
    }
  });

  return filteredTodos;
}

export const App: React.FC = () => {
  const [isLoadingTodos, setIsLoadingTodos] = useState(true);
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  // #region filter
  const [filter, setFilter] = useState<Filter>({
    completed: FilterCompleted.All,
    query: '',
  });

  const handleFilterCompletedChange = (newCompletedValue: FilterCompleted) => {
    setFilter({ ...filter, completed: newCompletedValue });
  };

  const handleFilterQueryChange = (newQuery: string) => {
    setFilter({ ...filter, query: newQuery });
  };
  // #endregion

  useEffect(() => {
    getTodos()
      .then(setTodosFromServer)
      .finally(() => setIsLoadingTodos(false));
  }, []);

  useEffect(() => {
    setFilteredTodos(getFilteredTodos(todosFromServer, filter));
  }, [todosFromServer, filter]);

  const handleCloseModal = () => {
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelect={handleFilterCompletedChange}
                onChange={handleFilterQueryChange}
              />
            </div>

            <div className="block">
              {isLoadingTodos && <Loader />}
              {!isLoadingTodos && (
                <TodoList
                  todos={filteredTodos}
                  onSelect={setSelectedTodo}
                  selectedTodoId={selectedTodo?.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} onClose={handleCloseModal} />
      )}
    </>
  );
};
