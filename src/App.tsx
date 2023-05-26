/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { SetTodoModalType } from './types/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoModal, setTodoModal] = useState<SetTodoModalType>({
    todo: {
      completed: false,
      id: 0,
      title: '',
      userId: 0,
    },
    user: {
      email: '',
      id: 0,
      name: '',
      phone: '',
    },
  });
  const [isClicked, setIsClicked] = useState(false);
  const [searchInput, setSearchInput] = useState<string>('');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [filterMode, setFilterMode] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(false);

  const extractTodos = async () => {
    try {
      const data = await getTodos();

      setTodos(data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  useEffect(() => {
    extractTodos();
  }, []);

  const filteredTodosArr = useMemo(() => {
    return todos.filter((todo) => {
      const isSearched = todo.title.toLowerCase().includes(searchInput.toLowerCase());

      if (filterMode === 'active') {
        return !todo.completed && isSearched;
      }

      if (filterMode === 'completed') {
        return todo.completed && isSearched;
      }

      return isSearched;
    });
  }, [searchInput, todos, filterMode]); // when we initialize setTodos somewhere, the link to the array changes (after re-render)

  useEffect(() => {
    setFilteredTodos(filteredTodosArr);
  }, [filteredTodosArr]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                setFilterMode={setFilterMode}
              />
            </div>

            <div className="block">
              {!todos.length
                ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodos}
                    setTodoModal={setTodoModal}
                    isClicked={isClicked}
                    setIsClicked={setIsClicked}
                    setIsLoading={setIsLoading}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {isClicked
      && (
        <TodoModal
          todoModal={todoModal}
          setIsClicked={setIsClicked}
          isLoading={isLoading}
        />
      )}
    </>
  );
};
