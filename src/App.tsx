/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo, Filter } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [handleClose, setHandleClose] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [searchText, setSearchText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos().then(json => {
      setTodos(json);
    });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter filter={filter} setFilter={setFilter} setSearchText={setSearchText} searchText={searchText} />
            </div>

            <div className="block">
              {(todos?.length > 0)
                ? <TodoList todos={todos} searchText={searchText} filter={filter} handleClose={handleClose} setHandleClose={setHandleClose} selectedTodo={selectedTodo} setSelectedTodo={setSelectedTodo} />
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {handleClose && <TodoModal setHandleClose={setHandleClose} todo={selectedTodo} />}
    </>
  );
};
