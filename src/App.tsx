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
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState(Filter.all);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentModal, setCurrentModal] = useState({
    userId: 0,
    id: 0,
    title: '0',
    completed: false,
  });

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(todosFromServer => {
        return todosFromServer.filter(todo =>
          todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      })
      .then(todosBySearch => {
        if (filter === Filter.active) {
          return todosBySearch.filter(todo => !todo.completed);
        } else if (filter === Filter.completed) {
          return todosBySearch.filter(todo => todo.completed);
        } else {
          return todosBySearch;
        }
      })
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, [filter, searchQuery]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                changeFilter={setFilter}
                changeSearchQuery={setSearchQuery}
                searchQuery={searchQuery}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}

              {!isLoading && !!todos.length && (
                <TodoList
                  todos={todos as Todo[]}
                  setCurrentModal={setCurrentModal}
                  currentModal={currentModal}
                />
              )}

              {!isLoading && !todos.length && (
                <p className="title is-5">There are no todos</p>
              )}

              {!isLoading && currentModal.userId !== 0 && (
                <TodoModal
                  currentModal={currentModal as Todo}
                  setCurrentModal={setCurrentModal}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
