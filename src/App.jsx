import React from 'react';
import './App.scss';
import './styles/general.scss';

import { getTodos } from './api/api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: null,
  }

  async componentDidMount() {
    const todosFromServer = await getTodos();

    this.setState({
      todos: todosFromServer,
    });
  }

  selectUser = (userId) => {
    this.setState({
      selectedUserId: userId,
    });
  }

  clearData = () => {
    this.setState({
      selectedUserId: null,
    });
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            selectUser={this.selectUser}
            todos={todos}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId
              ? (
                <CurrentUser
                  userId={selectedUserId}
                  clearData={this.clearData}
                />
              )
              : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
