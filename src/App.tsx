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
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisbleTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState<string>('');
  const [filter, setFilter] = useState<string>(Filter.ALL);
  const [isTodoLoaded, setTodoLoaded] = useState<boolean>(false);
  const [isModalOpened, setModalOpened] = useState<boolean>(false);
  const [todoToOpen, setTodoToOpen] = useState<Todo>();

  useEffect(() => {
    const loadTodos = async () => {
      await getTodos()
        .then(todosFromServer => {
          setTodos(todosFromServer);
          setVisbleTodos(todosFromServer);
        });

      setTodoLoaded(true);
    };

    loadTodos();
  }, []);

  const searchBy = (title: string) => {
    const params = query.toLowerCase();

    return title.toLocaleLowerCase().includes(params);
  };

  useEffect(() => {
    switch (filter) {
      case Filter.ALL:
        setVisbleTodos(todos.filter(todo => searchBy(todo.title)));
        break;

      case Filter.ACTIVE:
        setVisbleTodos(todos.filter(todo => !todo.completed
          && searchBy(todo.title)));
        break;

      case Filter.COMPLETED:
        setVisbleTodos(todos.filter(todo => todo.completed
          && searchBy(todo.title)));
        break;

      default:
        break;
    }
  }, [query, filter]);

  const handleOpenModal = (todo: Todo) => {
    setTodoToOpen(todo);
    setModalOpened(true);
  };

  const modalDisabler = () => {
    setModalOpened(false);
  };

  const getQuery = (inputQuery: string) => {
    setQuery(inputQuery);
  };

  const selectedFilter = (selectedFilterByUser: string) => {
    setFilter(selectedFilterByUser);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                getQuery={getQuery}
                selectedFilter={selectedFilter}
              />
            </div>

            <div className="block">
              {!isTodoLoaded
                ? <Loader />
                : <TodoList todos={visibleTodos} handleOpenModal={handleOpenModal} />}
            </div>
          </div>
        </div>
      </div>

      {isModalOpened && todoToOpen && <TodoModal todoToOpen={todoToOpen} modalDisabler={modalDisabler} />}
    </>
  );
};
