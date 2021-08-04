import React from 'react';
import './App.scss';
import './styles/general.scss';
import { getAllTodos, getUsersInfo } from './api/api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    this.setTodos(getAllTodos);
  }

  setSelectedUserId = (id) => {
    this.setState({
      selectedUserId: id,
    });
  }

  setTodos = (callback) => {
    callback().then(todos => this.setState({ todos }));
  }

  clearSelectedUser = () => {
    this.setState({ selectedUserId: 0 });
  }

  render() {
    const { selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            state={this.state}
            setSelectedUserId={this.setSelectedUserId}
          />
        </div>
        <button
          type="button"
          onClick={() => this.setTodos(getAllTodos)}
        >
          click
        </button>

        <div className="App__content">
          <div className="App__content-container">
            { selectedUserId
              ? (
                <CurrentUser
                  selectedUserId={selectedUserId}
                  clearSelectedUser={this.clearSelectedUser}
                />
              )
              : ('No user selected')
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
