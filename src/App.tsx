/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilterType } from './types/FilterTypes';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

const getVisibleTodos = (
  todos: Todo[],
  filterType: string,
  query: string,
): Todo[] => {
  let visibleTodos: Todo[] = [...todos];

  switch (filterType) {
    case FilterType.ACTIVE:
      visibleTodos = visibleTodos.filter(todo => !todo.completed);
      break;

    case FilterType.COMPLETED:
      visibleTodos = visibleTodos.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  return visibleTodos.filter(
    todo => todo.title.toLowerCase().includes(
      query.toLowerCase(),
    ),
  );
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [selectedModal, setSelectedModal] = useState<Todo | null>(null);
  const [isLoding, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = useState(FilterType.ALL);
  const [hasLoadingPageError, setHasLoadingPageError] = useState(false);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setHasLoadingPageError(true))
      .finally(() => setIsLoading(true));
  }, []);

  const visibleTodos = getVisibleTodos(todos, selectedType, query);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              {!hasLoadingPageError && (
                <TodoFilter
                  query={query}
                  onQuery={setQuery}
                  selectedType={selectedType}
                  onSelectedType={setSelectedType}
                />
              )}

            </div>

            {hasLoadingPageError
              ? (
                <div className="notification is-danger">
                  An error occured when loading data!
                </div>
              )
              : (
                <div className="block">
                  {isLoding
                    ? (
                      <TodoList
                        todos={visibleTodos}
                        selectedModal={selectedModal}
                        onSelectedModal={setSelectedModal}
                      />
                    )
                    : (
                      <Loader />
                    )}
                </div>
              )}

          </div>
        </div>
      </div>

      {selectedModal && (
        <TodoModal
          selectedModal={selectedModal}
          onSelectedModal={setSelectedModal}
        />
      )}
    </>
  );
};
