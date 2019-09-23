import React from 'react';

import TodoList from './components/TodoList/TodoList';
import './App.css';

class App extends React.Component {
  state = {
    isLoading: false,
    dataFromServer: [],
  }

getList = () => {
  this.setState({
    isLoading: true,
  });
  Promise.all([
    fetch('https://jsonplaceholder.typicode.com/todos'),
    fetch('https://jsonplaceholder.typicode.com/users'),
  ])
    .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
    .then(([todos, users]) => this.setState({
      dataFromServer: todos.map(todo => ({
        ...todo,
        user: users.find(person => person.id === todo.userId),
      })),
      isLoading: false,
    }));
};

sortCompleted = () => {
  this.setState(prevState => ({
    dataFromServer: prevState.dataFromServer.sort((a, b) => b.completed - a.completed),
  }));
}

sortTasks = () => {
  this.setState(prevState => ({
    dataFromServer: prevState.dataFromServer.sort((a, b) => (a.title > b.title ? 1 : -1)),
  }));
}

render() {
  if (this.state.isLoading) {
    return (
      <div className="app">
        <p>Loading ...</p>
      </div>
    );
  }

  if (this.state.dataFromServer.length === 0) {
    return (
      <div className="start">
        <button className="start-button" type="button" onClick={this.getList}>Show</button>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>Dynamic list of todos</h1>
      <button className="button-sort" type="button" onClick={this.sortTasks}>Task </button>
      <button className="button-sort" type="button" onClick={this.sortCompleted}>Complete </button>
      <TodoList
        dataFromServer={this.state.dataFromServer}
      />
    </div>
  );
}
}

export default App;
