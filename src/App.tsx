/* eslint-disable max-len */
/* eslint-disable */
// eslint-disable
import React, { useContext } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import {
  StateContext,
} from './components/ToDoContext';
import { Page } from './components/pages';

export const App: React.FC = () => {

  const { list, visibleList } = useContext(StateContext);


  const pageAmout = [];
  for (let i = 1; i <= Math.ceil(list.length / 18); i += 1) {
    pageAmout.push(i);
  }


  return (
    <>
      {/* <button onClick={getConvertedToDos}>get list</button> */}
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {/* <Loader /> */}
              <TodoList list={visibleList}/>
            </div>
          </div>
        </div>
      </div>

      {/* <TodoModal /> */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '20px',
      }}>

        {pageAmout.map(page => {
          return(
            <Page page={page} key={page}/>
          )
        })}
       {/* <button>1</button>
       <button
         value={2}
         onClick={(e) => clickHandler(e)}
       >
        2
      </button>
       <button>3</button>
       <button>4</button> */}
      </div>
    </>
  );
};
