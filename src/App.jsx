import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

import { getTodos } from './api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({
      todos,
    });
  }

  selectUser = (selectedUserId) => {
    this.setState({ selectedUserId });
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return todos.length !== 0 ? (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos.data}
            selectedUserId={selectedUserId}
            onSelectUser={this.selectUser}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                onClearSelectUser={this.selectUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    ) : (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
}

export default App;
