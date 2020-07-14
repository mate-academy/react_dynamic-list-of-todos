import React, { useState } from 'react';
import './App.css';
import { TodoWithUser } from './interfaces';
import { Table } from './Table';
import { Button } from './Button';

let initialState: TodoWithUser[];

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [preparedList, setPreparedList] = useState<TodoWithUser[]>([]);

  const beforeLoaded = () => {
    setIsLoading(true);
    setIsStarted(true);
  };

  const afterLoaded = (list: TodoWithUser[]) => {
    setPreparedList(list);
    initialState = [...list];
    setIsLoading(false);
    setIsLoaded(true);
  };

  function sortTodos(sorted: TodoWithUser[]) {
    setPreparedList([...sorted]);
  }

  return (
    <section>
      {
        !isStarted
          ? (
            <Button
              beforeLoaded={beforeLoaded}
              afterLoaded={afterLoaded}
            />
          )
          : (
            <button
              type="button"
              className="btn btn-dark ml shadow p-3 mb-5  rounded"
              onClick={() => setPreparedList([...initialState])}
            >
              <i className="material-icons left" />
              Reset
            </button>
          )
      }

      {
        isLoading
          ? <p className="ml">Loading....</p>
          : <></>
      }
      {
        isLoaded
          ? <Table preparedList={preparedList} sortTodos={sortTodos} />
          : <></>
      }
    </section>
  );
};

export default App;
