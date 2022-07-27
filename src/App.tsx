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
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<string>(Filter.ALL);
  const [isTodoLoaded, setTodoLoaded] = useState<boolean>(false);
  const [savedTodo, setSavedTodo] = useState<Todo>();
  const [modalIsOpened, setModalIsOpened] = useState(false);

  useEffect(() => {
    const loadTodos = async () => {
      await getTodos()
        .then(todosFromServer => {
          setTodos(todosFromServer);
          setVisibleTodos(todosFromServer);
        });

      setTodoLoaded(true);
    };

    loadTodos();
  }, []);

  const searchByWord = (title: string) => {
    const params = query.toLowerCase();

    return title.toLocaleLowerCase().includes(params);
  };

  useEffect(() => {
    switch (filter) {
      case Filter.ALL:
        setVisibleTodos(todos.filter(todo => searchByWord(todo.title)));
        break;

      case Filter.ACTIVE:
        setVisibleTodos(todos.filter(todo => !todo.completed && searchByWord(todo.title)));
        break;

      case Filter.COMPLITED:
        setVisibleTodos(todos.filter(todo => todo.completed && searchByWord(todo.title)));
        break;
      default:
        break;
    }
  }, [query, filter]);

  const todoOpener = (todo: Todo) => {
    setSavedTodo(todo);
    setModalIsOpened(true);
  };

  const modalCloser = () => {
    setModalIsOpened(false);
  };

  const getQuery = (userQuery: string) => {
    setQuery(userQuery);
  };

  const selectedFilter = (userFilter: string) => {
    setFilter(userFilter);
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
                : isTodoLoaded && (
                  <TodoList
                    todos={visibleTodos}
                    todoOpener={todoOpener}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {modalIsOpened
      && savedTodo
      && (
        <TodoModal
          todo={savedTodo}
          modalCloser={modalCloser}
        />
      )}
    </>
  );
};
