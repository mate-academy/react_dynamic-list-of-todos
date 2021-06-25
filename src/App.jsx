import React from 'react';
import { LinearProgress } from '@material-ui/core';

import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodosFromServer } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    setTimeout(() => {
      getTodosFromServer()
        .then(todos => this.setState({ todos: todos.data }));
    }, 2000);
  }

  setUserId = (id) => {
    if (this.state.userId === id) {
      return;
    }

    this.setState({
      selectedUserId: id,
    });
  }

  clearSelectedUserId = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          {
            todos.length
              ? <TodoList todos={todos} setUserId={this.setUserId} />
              : <LinearProgress />
          }
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {
              selectedUserId
                ? (
                  <CurrentUser
                    userId={selectedUserId}
                    clearSelectedUserId={this.clearSelectedUserId}
                  />
                )
                : (
                  <span>
                    <img
                      className="icon-user"
                      // eslint-disable-next-line
                      src="https://as1.ftcdn.net/v2/jpg/02/47/24/66/1000_F_247246603_CKyITrdJiCdtQ3pesJhsVWfMRGc20af2.jpg"
                      alt="icon-user"
                    />
                    <h2>No user selected</h2>
                  </span>
                )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
