import React from 'react';
import './App.css';
import TodosList from './components/TodosList/TodosList';

class App extends React.Component {
  state = {
    users: [],
    todos: [],
    hasError: null,
    isLoaded: false,
    isButtonShow: true,
  }

  handleGetData = () => {
    this.setState({
      isButtonShow: false,
      isLoaded: true,
    });

    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users'),
      fetch('https://jsonplaceholder.typicode.com/todos'),
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([users, todos]) => this.setState({
        isLoaded: false,
        users,
        todos,
      }))
      .catch(() => {
        this.setState({
          hasError: true,
        });
      });
  }

  getTodoWithUser = (todosArr, usersArr) => todosArr.map(todo => ({
    ...todo,
    user: usersArr.find(user => user.id === todo.userId),
  }))

  render() {
    console.log(this.state.todos);
    const preparedTodos
      = this.getTodoWithUser(this.state.todos, this.state.users);

    if (this.state.hasError) {
      return (
        <div>
          Error: omg wtf something wrong go away
        </div>
      );
    }
    if (this.state.isLoaded) {
      return (
        <div className="loading">Loading...</div>
      );
    }

    return (

      <div className="App">
        <h1>Static list of todos</h1>
        <div className="wrapper">
          {this.state.isButtonShow
            && (
              <button
                className="btnLoad"
                type="button"
                onClick={this.handleGetData}
              >
                get Data
              </button>
            )
          }

          <TodosList todos={preparedTodos} />
        </div>
      </div>
    );
  }
}

export default App;
