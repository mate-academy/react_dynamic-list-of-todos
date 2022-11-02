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
import { SortType } from './types/sortType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [query, setQuery] = useState('');
  const [sortType, setSortType] = useState<SortType | string>(SortType.ALL);

  const getUserFromServer = async () => {
    try {
      const userFromServer = await getTodos();

      setTodos(userFromServer);
      setIsLoaded(true);
    } catch (error) {
      throw new Error('Error. Can`t upload user');
    }
  };

  useEffect(() => {
    getUserFromServer();
  }, []);

  const filterTodos = () => {
    const sortedTodos = todos.filter(todo => {
      switch (sortType) {
        case SortType.ACTIVE:
          return !todo.completed;
        case SortType.COMPLETED:
          return todo.completed;
        default:
          return todo;
      }
    });

    return sortedTodos.filter(todo => (
      todo.title.toLowerCase().includes(query.toLowerCase())
    ));
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                sortType={sortType}
                setSortType={setSortType}
              />
            </div>

            <div className="block">
              {isLoaded
                ? (
                  <TodoList
                    todos={filterTodos()}
                    selectedTodo={selectedTodo}
                    setSelectedTodo={setSelectedTodo}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
