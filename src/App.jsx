import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { request } from './utils';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 4,
    selectedUser: null,
  };

  async componentDidMount() {
    const todos = await request('/todos');

    this.setState({
      todos,
    });
  }

  async componentDidUpdate() {
    const selectedUser = await
    // eslint-disable-next-line react/no-access-state-in-setstate
    request('/users', `/${this.state.selectedUserId}`);

    // eslint-disable-next-line react/no-did-update-set-state
    this.setState({ selectedUser });
  }

  handleChanges = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { todos, selectedUser, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList todos={todos} onClick={this.handleChanges} />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUser ? (
              <CurrentUser userId={selectedUserId} user={selectedUser} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
