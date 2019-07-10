import React from 'react';
import './App.css';

import TodoList from './components/TodoList';
import { getData } from './api/getData';

let currentList = [];
const myUrl = 'https://jsonplaceholder.typicode.com';

class App extends React.Component {
  state = {
    todos: [],
    isLoaded: false,
    isLoading: false,
    dir: 'asc',
  };

  async componentDidMount() {
    currentList = await getData(myUrl);
  }

  handleClick = () => {
    this.setState({
      isLoading: true,
    });

    document.getElementsByClassName('loadData').disabled = true;

    setTimeout(() => {
      this.setState({
        todos: currentList,
        isLoaded: true,
        isLoading: false,
      });
    }, 0);
  };

  sortBy = (key) => {
    this.setState(prevState => ({
      todos: prevState.todos.sort((a, b) => {
        if (key) {
          if (prevState.dir.localeCompare('asc')) {
            return (a[key] > b[key]) ? 1 : -1;
          }

          return (b[key] > a[key]) ? 1 : -1;
        }

        if (prevState.dir.localeCompare('asc')) {
          return (a.user.name.localeCompare(b.user.name));
        }

        return (b.user.name.localeCompare(a.user.name));
      }),
      dir: prevState.dir === 'asc' ? 'desc' : 'asc',
    }));
  };

  render() {
    return (
      <main>
        { this.state.isLoaded ? (
          <TodoList
            allTodos={this.state.todos}
            sortBy={this.sortBy}
          />
        ) : (
          <button
            type="button"
            className="loadData"
            onClick={this.handleClick}
            disabled={this.state.isLoading}
          >
            {this.state.isLoading ? 'Loading...' : 'Load' }
          </button>
        )}
      </main>
    );
  }
}

export default App;
