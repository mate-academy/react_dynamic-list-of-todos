/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
// import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { getTodos } from './api';

import { SortType } from './types/SortType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [filteredBySelect, setFilteredBySelect] = useState(SortType.all);
  const [filteredByQuery, setFilteredByQuery] = useState('');

  const loadFromServer = async () => {
    const todosFromServer = await getTodos();

    setTodos(todosFromServer);
    setVisibleTodos(todosFromServer);
  };

  useEffect(() => {
    // console.log(todos);
    // console.log(visibleTodos);
    loadFromServer();
  }, []);

  const filteredTodos = () => {
    const todosFilteredByQuery = todos.filter(todo => todo.title.includes(filteredByQuery));

    switch (filteredBySelect) {
      case SortType.all:
        setVisibleTodos(todosFilteredByQuery);
        break;

      case SortType.active:
        setVisibleTodos(todosFilteredByQuery.filter(todo => !todo.completed));
        break;

      case SortType.completed:
        setVisibleTodos(todosFilteredByQuery.filter(todo => todo.completed));
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    filteredTodos();
    // console.log(filteredBySelect);
    // console.log(filteredByQuery);
  }, [filteredBySelect, filteredByQuery]);

  const handleFilteredData = (select: string) => {
    switch (select) {
      case 'all':
        setFilteredBySelect(SortType.all);
        break;

      case 'active':
        setFilteredBySelect(SortType.active);
        break;

      case 'completed':
        setFilteredBySelect(SortType.completed);
        break;

      default:
        break;
    }
  };

  const handleFoundData = (query: string) => {
    setFilteredByQuery(query);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={filteredByQuery}
                handleFoundData={handleFoundData}
                handleFilteredData={handleFilteredData}
              />
            </div>

            <div className="block">
              {todos.length === 0 && <Loader />}
              <TodoList todos={visibleTodos} />
            </div>
          </div>
        </div>
      </div>

      {/* <TodoModal users={users} /> */}
    </>
  );
};
