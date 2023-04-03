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
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [user, setUser] = useState<User | 0>(0);
  const [selectedId, setSelectedId] = useState(0);
  const [selectedTodo, setSelectedTodo] = useState<Todo | 0>(0);
  const [todoSortByData, setTodoSortByData] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isListLoading, setIsListLoading] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);

  const loadTodoList = async () => {
    const loadedTodoList = await getTodos();

    if (loadedTodoList) {
      setIsListLoading(false);
      setTodos(loadedTodoList);
    }
  };

  const loadUser = async (todoId: number) => {
    const loadedUsers = await getUser(todoId);

    if (loadedUsers) {
      setUser(loadedUsers);
      setTimeout(() => {
        setIsModalLoading(false);
      }, 300);
    }
  };

  const selectSortBy = (sortByData: string) => {
    setTodoSortByData(sortByData);
  };

  const onSort = (todoSortBy: string) => {
    switch (todoSortBy) {
      case 'completed':
        return todos.filter(todo => todo.completed);

      case 'active':
        return todos.filter(todo => !todo.completed);

      default:
        return todos;
    }
  };

  const selectTodo = (todo: Todo | 0) => {
    if (todo !== 0) {
      setSelectedId(todo.id);
      setSelectedTodo(todo);
      loadUser(todo.id);
      setIsModalLoading(true);
    }
  };

  const addSearch = (searchWord: string) => {
    setSearchQuery(searchWord);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const closeModal = () => {
    setSelectedId(0);
    setSelectedTodo(0);
    loadUser(0);
  };

  const onSearch = (searchTerm: string) => {
    const todosForSearch = onSort(todoSortByData);
    const lowerQuery = searchTerm.trim().toLocaleLowerCase();

    if (!lowerQuery) {
      return todosForSearch;
    }

    return todosForSearch.filter(todo => todo.title
      .toLowerCase()
      .includes(lowerQuery));
  };

  const todoSortedData = onSearch(searchQuery);

  useEffect(() => {
    setIsListLoading(true);
    loadTodoList();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectSortBy={selectSortBy}
                searchQuery={searchQuery}
                addSearch={addSearch}
                clearSearch={clearSearch}
              />
            </div>

            <div className="block">
              {isListLoading
                ? (
                  <Loader />
                )
                : (
                  <TodoList
                    todoList={todoSortedData}
                    selectedId={selectedId}
                    selectTodo={selectTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {(selectedTodo !== 0 && user !== 0) && (
        <TodoModal
          todo={selectedTodo}
          user={user}
          closeModal={closeModal}
          modalLoader={isModalLoading}
        />
      )}
    </>
  );
};
