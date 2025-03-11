/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [selectedId, setSelectedId] = useState(0);
  const [activeModal, setActiveModal] = useState(false);
  const [selectedToDo, setSelectedToDo] = useState<Todo>();
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 300);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter setFilteredTodos={setFilteredTodos} />
            </div>

            <div className="block">
              {loader ? (
                <Loader />
              ) : (
                <TodoList
                  setSelectedId={setSelectedId}
                  filteredTodos={filteredTodos}
                  activeModal={activeModal}
                  setActiveModal={setActiveModal}
                  setSelectedToDo={setSelectedToDo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedId !== 0 && selectedToDo && (
        <TodoModal
          setSelectedId={setSelectedId}
          selectedToDo={selectedToDo}
          todoId={selectedId}
          activeModal={activeModal}
          setActiveModal={setActiveModal}
        />
      )}
    </>
  );
};
