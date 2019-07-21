import React from 'react';
import '../style.css';

import TodoList from './TodoList';

function App() {
  return (
    <>
      <div className="header">
        <h1>Dynamic list of TODOs</h1>
      </div>
      <TodoList />
    </>
  );
}

export default App;
