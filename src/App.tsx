/* eslint-disable max-len */

import React, { useEffect, useState, useMemo } from 'react';
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
  sortType: string,
  query: string,
): Todo[] => {
  let visibleTodos: Todo[] = [...todos];

  switch (sortType) {
    case FilterType.ACTIVE:
      visibleTodos = todos.filter(todo => !todo.completed);
      break;

    case FilterType.COMPLETED:
      visibleTodos = todos.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  const handleFilterTodos = (value: string, searchQuery: string) => {
    return (
      value.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMemo(() => visibleTodos.filter(({ title }) => (
    handleFilterTodos(title, query)
  )), [visibleTodos, query]);
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [selectedModal, setSelectedModal] = useState<Todo | null>(null);
  const [isLodingPage, setIsLoadingPage] = useState(false);
  const [selectedType, setSelectedType] = useState(FilterType.ALL);
  const [hasLoadingPageError, setHasLoadingPageError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedTodos = await getTodos();

        setTodos(fetchedTodos);
      } catch (error) {
        setHasLoadingPageError(true);
      } finally {
        setIsLoadingPage(true);
      }
    }

    fetchData();
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
                  {isLodingPage
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
