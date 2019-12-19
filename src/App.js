import React from 'react';
import './App.css';
import { todosPromise } from './api/todos';
import { usersPromise } from './api/users';
import TodoList from './TodoList';

class App extends React.Component {
  state = {
    data: [],
    isLoading: false,
    hasError: false,
  }

  todosWithUsers = () => {
    this.setState({
      isLoading: true,
    });

    todosPromise()
      .then((todosData) => {
        usersPromise().then((usersData) => {
          this.setState({
            data: todosData.map(todo => ({
              ...todo,
              user: usersData.find(user => user.id === todo.userId),
            }
            )),
            isLoading: false,
          });
        });
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          hasError: true,
        });
      });
  }

  render() {
    const { data, isLoading, hasError } = this.state;

    console.log(hasError);

    if (hasError) {
      return (
        <p>
          you have some problems with your network,
          <br />
          please refresh the page
        </p>
      );
    }

    if (data.length === 0) {
      return (
        <button
          type="button"
          onClick={this.todosWithUsers}
        >
          {isLoading ? 'Loading...' : 'Load'}
        </button>
      );
    }

    return (
      <div className="App">
        <h1>Dynamic list of todos</h1>
        <TodoList todos={data} />
      </div>
    );
  }
}

export default App;
