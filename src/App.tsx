/* eslint-disable max-len */
/* eslint-disable */
// eslint-disable
import React, { useContext, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import {
  StateContext,
  DispatchContext,
  ACTIONS,
} from './components/ToDoContext';
import { Page } from './components/pages';
import { getTodos } from './api';

export const App: React.FC = () => {

  const { list, visibleList, sortBy, searchValue } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  console.log(list.filter(todo => todo.completed), '???');
  // const arrayLength = () => {
  //   list.filter(todo => todo.completed)
  // }
  const pageAmout = []; 
  let pageLength = list.length;
  if (sortBy === 'All') {
    pageLength = list.length;
  }
  if (sortBy === 'Complited') {
    // console.log(list.filter(todo => todo.completed), '!!');
    pageLength = list.filter(elem => elem.completed).length
  }
  if (sortBy === 'Active') {
    // console.log(list.filter(todo => todo.completed), '!!');
    pageLength = list.filter(elem => !elem.completed).length
  }
  if (searchValue.length > 0) {
    pageLength = list.filter(todo => todo.title.includes(searchValue)).length
  }
  // console.log(pageLength, 'PG');

  for (let i = 1; i <= Math.ceil(pageLength / 18); i += 1) {
    pageAmout.push(i);
  }
  // console.log(pageAmout, "PA");

  useEffect(() =>{
    console.log('start loading');

    getTodos()
      .then(res => {
        dispatch({ type: ACTIONS.SET_LIST, payload: res })
      })
      .catch(() => console.log('error'))
      .finally(() => console.log('stop loading'));
  }, []);
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
              <TodoList list={visibleList} />
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
          return (
            <Page page={page} key={page} />
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
