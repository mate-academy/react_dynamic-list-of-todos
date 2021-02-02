import React from 'react';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

import './App.scss';
import './styles/general.scss';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    hasLoaded: false,
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({
      todos,
      hasLoaded: true,
    });
  }

  selectUser = (userId) => {
    this.setState({ selectedUserId: userId });
  };

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  };

  render() {
    const { selectedUserId, hasLoaded } = this.state;

    const todos = this.state.todos.filter(todo => todo.userId);

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            listHasLoaded={hasLoaded}
            selectUser={this.selectUser}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clearUser={this.clearUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
