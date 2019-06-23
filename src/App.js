import React from 'react';
import './App.css';
import TodoList from './Components/TodoList'

class App extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="App">
        <header>
          <h1 style={{ textTransform: 'uppercase' }}>Todos list</h1>
        </header>
        <TodoList />
      </div>
    );
  }
}


export default App;
