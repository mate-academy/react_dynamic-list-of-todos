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
    const todosFromServer = await getTodos();

    this.setState({ todos: todosFromServer });
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
          <TodoList
            todos={todos}
            onUserChange={this.setSelectedUser}
            selectedUserId={selectedUserId}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                onUserReset={() => this.setSelectedUser(null)}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
