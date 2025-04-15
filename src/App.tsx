import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { FilterType } from './FIlterType';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [loadingTodos, setLoadingTodos] = useState<boolean>(true);
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [pick, setPick] = useState<Todo | null>(null);
  const [searching, setSearching] = useState<string>('');

  const setDefault = () => {
    setPick(null);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      setLoadingTodos(true);
      const loadedTodos = await getTodos();

      setAllTodos(loadedTodos);
      setFilteredTodos(loadedTodos);
      setLoadingTodos(false);
    };

    fetchTodos();
  }, []);

  useEffect(() => {
    let todosToFilter = [...allTodos];

    if (searching.trim() !== '') {
      todosToFilter = todosToFilter.filter(todo =>
        todo.title.toLowerCase().includes(searching.toLowerCase()),
      );
    }

    switch (filter) {
      case 'active':
        todosToFilter = todosToFilter.filter(todo => !todo.completed);
        break;
      case 'completed':
        todosToFilter = todosToFilter.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    setFilteredTodos(todosToFilter);
  }, [filter, searching]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilter={setFilter}
                setSearching={setSearching}
                searching={searching}
              />
            </div>

            <div className="block">
              <Loader loadingTodos={loadingTodos} />
              <TodoList todos={filteredTodos} setPick={setPick} pick={pick} />
            </div>
          </div>
        </div>
      </div>
      {pick && (
        <TodoModal pick={pick} getUsers={getUser} setDefault={setDefault} />
      )}
    </>
  );
};
