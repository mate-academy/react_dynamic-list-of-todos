/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [selectedTodos, setSelectedTodos] = useState('all');
  const [isLoadingTodos, setIsLoadingTodos] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [modalIsShown, setModalIsShown] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoadingTodos(true);
        setTodos(null);
        const allTodos = await getTodos();

        setTodos(allTodos);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingTodos(false);
      }
    };

    loadData();
  }, []);

  const handleSelectedTodos = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTodos(event.target.value);
  };

  const handleSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const closeTodoModal = () => {
    setSelectedTodo(null);
    setModalIsShown(false);
  };

  const visibleTodos = todos
    ?.filter(todo => {
      if (selectedTodos === 'all') {
        return true;
      }

      if (selectedTodos === 'completed') {
        return todo.completed;
      }

      if (selectedTodos === 'active') {
        return !todo.completed;
      }

      return true;
    })
    .filter(todo =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  const handlesetIsLoadingUser = (isLoading: boolean) => {
    setIsLoadingUser(isLoading);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchQuery={searchQuery}
                selectedTodos={selectedTodos}
                clearSearch={clearSearch}
                handleSearchQuery={handleSearchQuery}
                handleSelectedTodos={handleSelectedTodos}
              />
            </div>

            <div className="block">
              {isLoadingTodos ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                  setModalIsShown={setModalIsShown}
                  handleSelectTodo={handleSelectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {modalIsShown && selectedTodo ? (
        <TodoModal
          getUser={getUser}
          choosenTodo={selectedTodo}
          isLoadingUser={isLoadingUser}
          handlesetIsLoadingUser={handlesetIsLoadingUser}
          closeTodoModal={closeTodoModal}
        />
      ) : null}
    </>
  );
};
