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
    todosError: false,
  };

  componentDidMount() {
    getTodos()
      .then((todos) => {
        this.setState({
          todos,
        });
      })
      .catch(() => this.setState({ todosError: true }));
  }

  selectUser = (selectedUserId) => {
    this.setState({
      selectedUserId,
    });
  }

  clearSelectedUser = () => {
    this.setState({ selectedUserId: 0 });
  }

  render() {
    const { todos, selectedUserId, todosError } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          {todosError
            ? (
              <h2>
                {`Can't load todos, please reload the page `}
              </h2>
            )
            : (
              <TodoList
                todos={todos}
                selectedUserId={selectedUserId}
                selectUser={this.selectUser}
              />
            )
          }
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clearSelectedUser={this.clearSelectedUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
