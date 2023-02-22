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
import { FilterBy } from './types/FilterBy';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [query, setQuery] = useState<string>('');
  const [isTodosLoaded, setIsTodosLoaded] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [filterBy, setFilter] = useState(FilterBy.ALL);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const getTodosFromServer = async () => {
    const result = await getTodos();

    setTodosFromServer(result);
    setIsTodosLoaded(true);
  };

  const setFilterBy = (filter: FilterBy) => {
    setFilter(filter);
  };

  const visibleTodos = () => {
    let todos = todosFromServer;
    const normilizedQuery = query.trim().toLowerCase();

    if (normilizedQuery !== '') {
      todos = todos.filter(todo => todo.title.toLowerCase().includes(query));
    }

    switch (filterBy) {
      case FilterBy.ACTIVE:
        return todos.filter(todo => todo.completed === false);

      case FilterBy.COMPLETED:
        return todos.filter(todo => todo.completed === true);

      case FilterBy.ALL:
        return todos;
      default:
        throw new Error('Unexpected filter type');
    }
  };

  const changeModalState = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilterBy={setFilterBy}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {!isTodosLoaded
                && <Loader />}

              {isTodosLoaded
                && (
                  <TodoList
                    todos={visibleTodos()}
                    changeModalState={changeModalState}
                    isModalVisible={isModalVisible}
                    setSelectedTodo={setSelectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {isModalVisible && selectedTodo
      && (
        <TodoModal
          changeModalState={changeModalState}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};
