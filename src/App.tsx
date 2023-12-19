import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import MyContextProvider, { useMyContext } from './context/myContext';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const { isLoading } = useMyContext();
  const [isTodo, setIsTodo] = useState<boolean>(false);

  return (
    <MyContextProvider>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                setIsTodo={setIsTodo}
              />
            </div>
          </div>
        </div>
      </div>
      {isTodo
        && (
          <TodoModal
            setIsTodo={setIsTodo}
          />
        )}
    </MyContextProvider>
  );
};
