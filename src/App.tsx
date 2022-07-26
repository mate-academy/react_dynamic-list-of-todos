/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Filter } from './Filter';

export const App: React.FC = () => {
  const [isLoadedTodos, setIsLoadedTodos] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [showTodo, setShowTodo] = useState<Todo>();
  const [isOpenedTodo, setIsOpenedTodo] = useState<boolean>(false);
  const [filterSelect, setFilterSelect] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const loadTodos = async () => {
      await getTodos().then(todoList => {
        setTodos(todoList);
        setVisibleTodos(todoList);
      });

      setIsLoadedTodos(true);
    };

    loadTodos();
  }, []);

  const findTitle = (title: string) => {
    const params = searchQuery.toLowerCase();

    return title.toLocaleLowerCase().includes(params);
  };

  useEffect(() => {
    switch (filterSelect) {
      case Filter.ALL:
        setVisibleTodos(todos.filter(todo => findTitle(todo.title)));
        break;

      case Filter.ACTIVE:
        setVisibleTodos(todos.filter(todo => !todo.completed && findTitle(todo.title)));
        break;

      case Filter.COMPLEATED:
        setVisibleTodos(todos.filter(todo => todo.completed && findTitle(todo.title)));
        break;

      default:
        break;
    }
  }, [searchQuery, filterSelect]);

  const openTodo = (todo: Todo) => {
    setShowTodo(todo);
    setIsOpenedTodo(true);
  };

  const checkShowTodo = () => {
    setIsOpenedTodo(false);
  };

  const setOption = (option: string) => {
    setFilterSelect(option);
  };

  const setSearchWord = (searchWord: string) => {
    setSearchQuery(searchWord);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter setOption={setOption} setSearchWord={setSearchWord} />
            </div>

            <div className="block">
              {!isLoadedTodos
                ? <Loader />
                : <TodoList todos={visibleTodos} openTodo={openTodo} />}
            </div>
          </div>
        </div>
      </div>

      {isOpenedTodo && showTodo
        && <TodoModal todo={showTodo} isOpenTodo={checkShowTodo} />}
    </>
  );
};
