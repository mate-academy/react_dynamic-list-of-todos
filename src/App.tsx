/* eslint-disable max-len */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';


export const App: React.FC = () => {
  const [todoQuery , setTodoQuery] = useState('all')
  const [todoSearchQuery , setTodoSearchQuery] = useState('')



  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block">
              <TodoFilter setTodoQuery={setTodoQuery}   setTodoSearchQuery ={setTodoSearchQuery}   todoSearchQuery={todoSearchQuery} />
            </div>
            <div className="block">
              <TodoList todoQuery={todoQuery}  todoSearchQuery={todoSearchQuery} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
