import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos, getUser } from './api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 1,
  };

  componentDidMount() {
    getTodos()
      .then(todos => this.setState({ todos }));
  }

  onSelectUserId = (userId) => {
    this.setState({
      selectedUserId: +userId,
    });
  };

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            onSelectUserId={this.onSelectUserId}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                getUser={getUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
