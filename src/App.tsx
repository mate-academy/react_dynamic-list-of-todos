/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilteringQuery } from './types/FilteringQuery';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[] | null>(null);
  const [visibleTodos, setVisibleTodos] = useState<Todo[] | null>(null);

  const [filterQuery, setFilterQuery] = useState<FilteringQuery>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isShownModal, setIsShownModal] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const isReadyToShowTodos = !isLoading && visibleTodos;

  const selectTodo = useCallback((todo: Todo) => {
    setSelectedTodo(todo);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedTodo(null);
  }, []);

  const selectFilterQuery = useCallback((filterBy: FilteringQuery) => {
    setFilterQuery(filterBy);
  }, []);

  const selectSearchQuery = useCallback((searchBy: string) => {
    setSearchQuery(searchBy);
  }, []);

  useEffect(() => {
    getTodos()
      .then(setTodosFromServer)
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (selectedTodo) {
      setIsShownModal(true);
    } else {
      setIsShownModal(false);
    }
  }, [selectedTodo]);

  useEffect(() => {
    if (!todosFromServer) {
      return;
    }

    let preparedTodos: Todo[] = todosFromServer;

    switch (filterQuery) {
      case 'active':
        preparedTodos = todosFromServer.filter(todo => !todo.completed);
        break;
      case 'completed':
        preparedTodos = todosFromServer.filter(todo => todo.completed);
        break;
      case 'all':
      default:
        break;
    }

    if (searchQuery) {
      preparedTodos = preparedTodos.filter(todo => {
        return todo.title.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }

    setVisibleTodos(preparedTodos);
  }, [filterQuery, searchQuery, todosFromServer]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelectFiltering={selectFilterQuery}
                searchQuery={searchQuery}
                selectSearchQuery={selectSearchQuery}
              />
            </div>

            <div className="block">
              {
                isLoading
                  && <Loader />
              }

              {
                isReadyToShowTodos && visibleTodos.length === 0
                  && <p>There are no todos to show!</p>
              }

              {
                isReadyToShowTodos && visibleTodos.length > 0
                  && (
                    <TodoList
                      todos={visibleTodos}
                      selectedTodo={selectedTodo}
                      onSelectTodo={selectTodo}
                    />
                  )
              }
            </div>
          </div>
        </div>
      </div>

      {
        isShownModal && selectedTodo
          && <TodoModal selectedTodo={selectedTodo} onCloseModal={closeModal} />
      }
    </>
  );
};
