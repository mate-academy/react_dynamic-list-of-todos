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
import { Filter } from './types/Filters';

export const App: React.FC = () => {
  const [todo, setTodo] = useState<Todo | null>();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [modalHeader, setModalHeader] = useState(false);
  const [visibleTodos, setVisibleTodos] = useState<Filter>('all');
  const [searchInputValue, setSearchInput] = useState('');
  const [isloading, setIsloading] = useState(true);

  const filteredTodos = (objects: Todo[], filter: Filter, word: string) => {
    switch (filter) {
      case 'active':
        return objects.filter(
          t => t.completed === false && t.title.includes(word),
        );

      case 'completed':
        return objects.filter(
          t => t.completed === true && t.title.includes(word),
        );

      default:
        return objects.filter(t => t.title.includes(word));
    }
  };

  const newTodos = filteredTodos(todos, visibleTodos, searchInputValue);

  useEffect(() => {
    setIsloading(true);
    getTodos()
      .then(setTodos)
      .catch(error => {
        throw new Error(`${error} ups... can't load todos`);
      })
      .finally(() => setIsloading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchInputValue={searchInputValue}
                setSearchInput={setSearchInput}
                setVisibleTodos={setVisibleTodos}
              />
            </div>

            <div className="block">
              {isloading && <Loader />}
              {!isloading && todos.length > 0 && (
                <TodoList
                  todos={newTodos}
                  setModalHeader={setModalHeader}
                  setTodo={setTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {modalHeader && (
        <TodoModal
          todo={todo}
          modalHeader={modalHeader}
          setModalHeader={setModalHeader}
        />
      )}
    </>
  );
};
