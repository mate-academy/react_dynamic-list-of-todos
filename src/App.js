import React from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';
import {users, todos} from "./components/GetUrl/GetUrl";

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
      todos,
      users
    ])
      .then(([todos, users])=> this.setState({
        serverData: todos.map(todo => ({
          ...todo,
          user: users.find(person => person.id === todo.userId),
        })),
        loading: false,
      }));
  };

  handleSort = (sort) => {
    this.setState(prevState => ({
      serverData: prevState.serverData.sort((a, b) => {
        switch (sort) {
          case 'completed':
            return b.completed - a.completed;
          default:
            return a.title.localeCompare(b.title);
        }
      }),
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

    const { serverData, loading } = this.state;
    if (!serverData.length) {
      return (
        <div className="start">
          <button
            className="start-button ui primary button"
            type="button"
            onClick={this.getList}
          >
              Show
          </button>
        </div>
      );
    }
    return (
      <div className="app">
        <div className="buttons">
        <button
          className="button-sort ui primary button"
          type="button"
          onClick={this.handleSort}
        >
          Task
        </button>
        <button
          className="button-sort ui primary button"
          type="button"
          onClick={this.handleSort}
        >
            Complete
        </button>
        </div>
          <TodoList serverData={this.state.serverData} />
      </div>
    );
  }
}

export default App;
