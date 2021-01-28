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

  componentDidMount() {
    getTodos()
      .then((result) => {
        this.setState({ todos: result.data });
      });
  }

  clearSelectedUserId = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  setSelectedUserId = (result) => {
    this.setState({
      selectedUserId: result,
    });
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            onChange={(userId) => {
              this.setSelectedUserId(userId);
            }}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                onChange={(userId) => {
                  this.clearSelectedUserId(userId);
                }}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
