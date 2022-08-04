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
  const [isLoadedTodos, setIsLoadedTodos] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isOpenedTodo, setIsOpenedTodo] = useState(false);
  const [selectFilter, setSelectFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

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

    return title.toLowerCase().includes(params);
  };

  const filteredTodos = todos.filter(todo => {
    switch (selectFilter) {
      case Filter.all:
        return findTitle(todo.title);

      case Filter.active:
        return !todo.completed && findTitle(todo.title);

      case Filter.completed:
        return todo.completed && findTitle(todo.title);

      default:
        return todo;
    }
  });

  useEffect(() => setVisibleTodos(filteredTodos), [searchQuery, selectFilter]);

  const handleOpenTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsOpenedTodo(true);
  };

  const handleCloseTodo = () => {
    setIsOpenedTodo(false);
    setSelectedTodo(null);
  };

  const handleSaveOption = (option: string) => {
    setSelectFilter(option);
  };

  const handleSaveQuery = (searchWord: string) => {
    setSearchQuery(searchWord);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleSaveOption={handleSaveOption}
                handleSaveQuery={handleSaveQuery}
              />
            </div>

            <div className="block">
              {!isLoadedTodos
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    handleOpenTodo={handleOpenTodo}
                    selectedTodoId={selectedTodo?.id}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {isOpenedTodo && selectedTodo
        && <TodoModal todo={selectedTodo} handleCloseTodo={handleCloseTodo} />}
    </>
  );
};
