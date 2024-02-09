/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';
import { FilterByCompleted } from './types/FilterByCompleted';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [titleFilter, setTitleFilter] = useState('');
  const [completedFilter, setCompletedFilter] = useState<FilterByCompleted>(FilterByCompleted.All);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block">
              <TodoFilter
                titleFilter={titleFilter}
                onTitleFilterChange={setTitleFilter}
                completedFilter={completedFilter}
                onCompletedFilterChange={setCompletedFilter}
              />
            </div>

            <div className="block">

              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todos}
                  titleFilter={titleFilter}
                  completedFilter={completedFilter}
                  onTodoSelect={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal selectedTodo={selectedTodo} onModalClose={setSelectedTodo} />}
    </>
  );
};
