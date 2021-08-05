import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { request } from './utils/request';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    request('/todos').then((todos) => {
      this.setState({
        todos,
      });
    });
  }

  showUserDetails = (userId) => {
    this.setState({
      selectedUserId: userId,
    });
  }

  resetUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          {todos.length === 0 ? (
            <>
              <div className="spinner-border" role="status">
                <span className="sr-only" />
              </div>
              <p>Todos are loading...</p>
            </>
          ) : (
            <TodoList
              todos={todos}
              selectUser={this.showUserDetails}
            />
          )}
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser userId={selectedUserId} resetUser={this.resetUser} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
