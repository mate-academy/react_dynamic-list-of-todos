import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos, getUser } from './api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    getTodos()
      .then((todos) => {
        this.setState({ todos });
      })
      // eslint-disable-next-line no-alert
      .catch(error => window.alert(`Something went wrong. ${error}`));
  }

  selectUserId = (userId) => {
    this.setState({
      selectedUserId: userId,
    });
  }

  clearUserId = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectedUserId={selectedUserId}
            selectUserId={this.selectUserId}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                selectedUserId={selectedUserId}
                getUser={getUser}
                clearUserId={this.clearUserId}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
