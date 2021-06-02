import React from 'react';
import './App.scss';
import './styles/general.scss';
import CurrentUser from './components/CurrentUser/CurrentUser';
import TodoList from './components/TodoList/TodoList';
import { getTodos } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: null,
  };

  async componentDidMount() {
    this.setState({
      todos: await getTodos(),
    });
  }

  setSelectedUser = (id) => {
    this.setState({
      selectedUserId: id,
    });
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList todos={todos} onChangeUser={this.setSelectedUser} />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                onChangeUser={this.setSelectedUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
