/* eslint-disable max-len */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Selected } from './types/index';

export const App: React.FC = () => {
  const [loadTodos, setLoadTodos] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [todoId, settodoiD] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Selected>(Selected.all);

  const isLoadTodos = (data: boolean | ((prevState: boolean) => boolean)) => {
    setLoadTodos(data);
  };

  const whichModal = (user: number | null, todo: number | null) => {
    setUserId(user);
    settodoiD(todo);
  };

  const handleChangeQuery = (data: string) => {
    setQuery(data);
  };

  const handleChangeSelected = (data: Selected) => {
    setSelected(data);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleChangeSelected={handleChangeSelected}
                handleChangeQuery={handleChangeQuery}
                query={query}
                selected={selected}
              />
            </div>

            <div className="block">
              {loadTodos && <Loader />}
              <TodoList
                isLoadTodos={isLoadTodos}
                whichModal={whichModal}
                query={query}
                selected={selected}
                todoId={todoId}
              />
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        userId={userId}
        todoId={todoId}
        whichModal={whichModal}
      />
    </>
  );
};
