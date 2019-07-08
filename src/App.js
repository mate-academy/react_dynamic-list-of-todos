import React from 'react';
import './App.css';
import TodoList from './TodoList';
import getTodos from './getTodos';
import getUsers from './getUsers';
import './App.css';

class App extends React.Component {
  state = {
    todos: [],
    users: [],
    isLoaded: false,
    isLoading: false,
  };

  loadData = async function() {
    this.setState({
      isLoading: true,
    });
    this.todos = await getTodos();
    this.users = await getUsers();

    console.log(this.todos);
    console.log(this.users);
  };

  handlerClick = () => {
    this.loadData();
    setTimeout(() => {
      this.setState({
        isLoaded: true,
      });
    }, 2000);
  };

  render() {
    return (
      <main className="main">
        {
          (!this.state.isLoaded)
            ? (
              <button onClick={this.handlerClick} className="main__button" type="button">
                {this.state.isLoading ? 'Loading...' : 'Load'}
              </button>
            ) : (
              <TodoList
                todos={this.todos}
                users={this.users}
              />
            )
        }
      </main>
    );
  }
}

export default App;
