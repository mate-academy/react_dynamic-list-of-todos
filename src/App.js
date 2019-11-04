import React from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';

class App extends React.Component {
  state = {
    serverData: [],
    loading: false,
  };

  getList = () => {
    this.setState({
      loading: true,
    });
    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/todos'),
      fetch('https://jsonplaceholder.typicode.com/users'),
    ])
      .then(([result, result2]) => Promise.all([result.json(), result2.json()]))
      .then(([todos, users]) => this.setState({
        serverData: todos.map(todo => ({
          ...todo,
          user: users.find(person => person.id === todo.userId),
        })),
        loading: false,
      }));
  };
  sortCompletedTasks = () => {
    this.setState(prevState => ({
      serverData: prevState.serverData.sort((a, b) => b.completed - a.completed),
    }));
  };

  sortTasks = () => {
    this.setState(prevState => ({
      serverData: prevState.serverData.sort((a, b) => (a.title > b.title ? 1 : -1)),
    }));
  };

  render() {
    if (this.state.loading) {
      return (
        <div className="app">
          <p>Loading ...</p>
        </div>
      );
    }

    if (this.state.serverData.length === 0) {
      return (
        <div className="start">
          <button className="start-button" class="ui primary button" type="button" onClick={this.getList}>Show</button>
        </div>
      );
    }
    return (
      <div className="app">
        <div className="buttons">
        <button className="button-sort" class="ui primary button" type="button" onClick={this.sortTasks}>Task </button>
        <button className="button-sort" class="ui primary button" type="button" onClick={this.sortCompletedTasks}>Complete </button>
        </div>
          <TodoList serverData={this.state.serverData} />
      </div>
    );
  }
}

export default App;
