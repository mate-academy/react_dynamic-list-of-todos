import React from 'react';

import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import './styles/general.scss';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    getTodos()
      .then((todos) => {
        this.setState({ todos });
      });
  }

  selectUserId = (id) => {
    this.setState({ selectedUserId: id });
  }

  clearUserId = () => {
    this.setState({ selectedUserId: 0 });
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectUserId={this.selectUserId}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clearUser={this.clearUserId}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
