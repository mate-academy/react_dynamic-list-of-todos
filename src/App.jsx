import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodosFromServer } from './api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    getTodosFromServer().then((data) => {
      this.setState({
        todos: data,
      });
    });
  }

  changeSelectedUser = (id) => {
    this.setState({
      selectedUserId: id,
    });
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <button
            type="button"
            onClick={() => {
              getTodosFromServer().then((data) => {
                // eslint-disable-next-line no-alert
                window.alert('you are realy naughty baby');

                this.setState({
                  todos: data.slice(0, 3),
                // it dont updates because of I already define state in TodoList
                // continue is in TodoList
                });
              });
            }}
          >
            get data again (DONT TOUCH, BOMB WILL BOOM)
          </button>

          {todos.length > 1
            ? (
              <TodoList
                todos={todos}
                changeSelectedUser={this.changeSelectedUser}
              />
            ) : ''}
          {/* how to fix this crutch? (crutch above)
          I will cant to update it again */}
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                changeSelectedUser={this.changeSelectedUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
