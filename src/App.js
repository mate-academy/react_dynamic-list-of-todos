import React from 'react';
import './App.css';

import getTodos from './api/getTodos';
import getUsers from './api/getUsers';
import TodoList from './Components/TodoList';

let todosWithUsers = [];

class App extends React.Component {
  state = {
    todosData: [],
    isLoaded: false,
    isLoading: false,
  };

  async componentDidMount() {
    const users = await getUsers();
    const todos = await getTodos();

    todosWithUsers = todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    }));
  }

  handleClick = () => {
    this.setState({
      isLoading: true,
    });

    setTimeout(() => {
      this.setState({
        todosData: todosWithUsers,
        isLoaded: true,
        isLoading: false,
      });
    }, 2000);
  };

  render() {
    return (
      <div className="App">
        { this.state.isLoaded ? (
          <>
            <h1 className="main-title">Dynamic list of todos</h1>

            <TodoList todosData={this.state.todosData} />
          </>
        ) : (
          <button type="button" onClick={this.handleClick} className="load-btn">
            {this.state.isLoading ? 'Loading...' : 'Load' }
          </button>
        )}
      </div>
    );
  }
}

export default App;
