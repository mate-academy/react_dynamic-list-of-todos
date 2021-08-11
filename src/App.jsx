import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({ todos });
  }

  handleSelectUser = (id) => {
    this.setState({ selectedUserId: id });
  };

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          {this.state.todos.length !== 0
            ? (
              <TodoList
                todos={todos}
                onSelectUser={this.handleSelectUser}
              />
            )
            : 'Loading...'
        }
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                onClearUser={() => this.handleSelectUser(0)}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
