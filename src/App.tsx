import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { FilteringMode } from './types/FilteringMode';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [inspectedTodo, setInspectedTodo] = useState<null | Todo>(null);
  const [filteringMode, setFilteringMode]
    = useState<FilteringMode>(FilteringMode.All);
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilteringMode={setFilteringMode}
                setSearchQuery={setSearchQuery}
                searchQuery={searchQuery}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                setIsLoading={setIsLoading}
                setInspectedTodo={setInspectedTodo}
                filteringMode={filteringMode}
                searchQuery={searchQuery}
                inspectedTodo={inspectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {inspectedTodo
      && (
        <TodoModal
          inspectedTodo={inspectedTodo}
          setInspectedTodo={setInspectedTodo}
        />
      )}
    </>
  );
};

export { FilteringMode };
