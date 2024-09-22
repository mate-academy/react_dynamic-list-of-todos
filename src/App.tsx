/* eslint-disable max-len */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export const App: React.FC = () => {
  const [filterBy, setFilterBy] = useState('');
  const [filterBySelect, setFilterBySelect] = useState('all');
  const [modalShowId, setModalShowId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                filterBySelect={filterBySelect}
                setFilterBySelect={setFilterBySelect}
              />
            </div>

            <div className="block">
              <TodoList
                modalShowId={modalShowId}
                filterBy={filterBy}
                filterBySelect={filterBySelect}
                setModalShowId={setModalShowId}
                todos={todos}
                setTodos={setTodos}
              />
            </div>
          </div>
        </div>
      </div>
      {modalShowId !== 0 && (
        <TodoModal
          modalShowId={modalShowId}
          setModalShowId={setModalShowId}
          todos={todos}
        />
      )}
    </>
  );
};
