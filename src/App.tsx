/* eslint-disable max-len */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';

import { useFetchData } from './hooks/useFetchData';
import { useFetchUser } from './hooks/useFetchUser';

export const App: React.FC = () => {
  const [selectedQuery, setSelectedQuery] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [clickedTodoId, setClickedTodoId] = useState<number | null>(null);

  const [userTodo, setUserTodo] = useState<Todo | null>(null);

  const { fetchedData, renderedData, setRenderedData, isLoader } =
    useFetchData();

  const { fetchedUser, fetchError, isUserLoader } = useFetchUser(clickedTodoId);

  const applyFilters = (status: string, query: string) => {
    let filtered = [...fetchedData];

    if (status === 'active') {
      filtered = filtered.filter(x => !x.completed);
    }

    if (status === 'completed') {
      filtered = filtered.filter(x => x.completed);
    }

    if (query) {
      const queryString = query.trim().toLowerCase();

      filtered = filtered.filter(x =>
        x.title.toLowerCase().includes(queryString),
      );
    }

    setRenderedData(filtered);
  };

  // const applyFilters = (status: string, query: string) => {
  //   let filtered = [...fetchedData];

  //   if (status === 'active') {
  //     filtered = filtered.filter(x => !x.completed);
  //   }

  //   if (status === 'completed') {
  //     filtered = filtered.filter(x => x.completed);
  //   }

  //   if (query) {
  //     const queryString = query.trim().toLowerCase();

  //     filtered = fetchedData.filter(x =>
  //       x.title.toLowerCase().includes(queryString),
  //     );

  //     setRenderedData(filtered);
  //   }
  // };

  const handleSelectedQuery = (query: string) => {
    setSelectedQuery(query);
    applyFilters(query, searchQuery);
  };

  const handleSearchedQuery = (query: string) => {
    setSearchQuery(query);
    applyFilters(selectedQuery, query);
  };

  // const handleSelectedQuery = (query: string) => {
  //   setSelectedQuery(query);
  //   switch (query) {
  //     case 'all':
  //       return setRenderedData(fetchedData);
  //     case 'active':
  //       const notCompleted = fetchedData.filter(x => x.completed === false);

  //       return setRenderedData(notCompleted);
  //     case 'completed':
  //       const completed = fetchedData.filter(x => x.completed === true);

  //       return setRenderedData(completed);
  //     default:
  //       return 0;
  //   }
  // };

  // const handleSearchedQuery = (query: string) => {
  //   setSearchQuery(query);
  //   if (query) {
  //     const queryString = query.trim().toLowerCase();
  //     const filtered = fetchedData.filter(x =>
  //       x.title.toLowerCase().includes(queryString),
  //     );

  //     setRenderedData(filtered);
  //   } else {
  //     handleSelectedQuery(selectedQuery);
  //   }
  // };
  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedQuery={selectedQuery}
                handleSelectedQuery={handleSelectedQuery}
                searchQuery={searchQuery}
                handleSearchedQuery={handleSearchedQuery}
              />
            </div>

            <div className="block">
              {isLoader && <Loader />}
              {/* <Loader /> */}
              {fetchError && <>{fetchError}</>}
              <TodoList
                renderedData={renderedData}
                isOpenModal={isOpenModal}
                setIsOpenModal={setIsOpenModal}
                clickedTodoId={clickedTodoId}
                setClickedTodoId={setClickedTodoId}
                setUserTodo={setUserTodo}
              />
            </div>
          </div>
        </div>
      </div>
      {isOpenModal && (
        <TodoModal
          user={fetchedUser}
          userTodo={userTodo}
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          isUserLoader={isUserLoader}
        />
      )}
    </>
  );
};
