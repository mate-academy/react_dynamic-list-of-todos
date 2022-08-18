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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosFiltered, setTodosFiltered] = useState('all');
  const [query, setQuery] = useState('');

  async function loadFromServer() {
    const todosFromServer = await getTodos();

    todosFromServer.filter(todo => todo.title.includes(query));

    switch (todosFiltered) {
      case 'all':
        setTodos(todosFromServer);
        break;

      case 'active':
        setTodos(todosFromServer.filter(todo => !todo.completed));
        break;

      case 'completed':
        setTodos(todosFromServer.filter(todo => todo.completed));
        break;

      default:
        break;
    }
  }

  useEffect(() => {
    // console.log('render');
    loadFromServer();
  }, []);

  const handleFilteredData = (value: string) => {
    setTodosFiltered(value);
  };

  const handleFoundData = (value: string) => {
    setQuery(value);
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
                foundData={handleFoundData}
                filteredData={handleFilteredData}
              />
            </div>

            <div className="block">
              {todos.length === 0 && <Loader />}
              <TodoList todos={todos} />
            </div>
          </div>
        </div>
      </div>

      {/* <TodoModal users={users} /> */}
    </>
  );
};
