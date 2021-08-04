import React from 'react';
import './App.scss';
import './styles/general.scss';
import { getAllTodos, getUsersInfo } from './api/api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

class App extends React.Component {
  state = {
    todos: [],
    user: {},
    selectedUserId: 0,
  };

  componentDidMount() {
    this.setTodos(getAllTodos);
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedUserId !== this.state.selectedUserId) {
      this.setUser(getUsersInfo);
    }
  }

  setSelectedUserId = (id) => {
    this.setState({
      selectedUserId: id,
    });
  }

  setTodos = (callback) => {
    callback().then(todos => this.setState({ todos }));
  }

  setUser = async(callback) => {
    callback(this.state.selectedUserId).then(user => this.setState({ user }));
  }

  clearSelectedUser = () => {
    this.setState({ user: {}});
  }

  render() {
    const { user, selectedUserId } = this.state;

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
            {
              selectedUserId && selectedUserId
                ? <CurrentUser users={user} clearSelectedUser={this.clearSelectedUser} />
                : 'No user selected'
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
