/* eslint-disable max-len */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [loadTodos, setLoadTodos] = useState(false);
  const [loadModal, setLoadModal] = useState<number | null>(null);
  const [todoId, settodoiD] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState('all');

  const isLoadTodos = (data: boolean | ((prevState: boolean) => boolean)) => {
    setLoadTodos(data);
  };

  const whichModal = (userId: number | null, todo: number | null) => {
    setLoadModal(userId);
    settodoiD(todo);
  };

  const whatQuery = (data: string) => {
    setQuery(data);
  };

  const whatSelected = (data: string) => {
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
                whatSelected={whatSelected}
                whatQuery={whatQuery}
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
        loadModal={loadModal}
        todoId={todoId}
        whichModal={whichModal}
      />
    </>
  );
};
