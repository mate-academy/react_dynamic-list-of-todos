import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

import { request } from './api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  async componentDidMount() {
    const allTodos = await request('todos');
    const filteredTodos = await allTodos.filter(todo => todo.title);

    this.setState({
      todos: filteredTodos,
    });
  }

  setUserId = (id) => {
    this.setState({
      selectedUserId: id,
    });
  }

  clearUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList todos={todos} onSelectedUser={this.setUserId} />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {
              selectedUserId
                ? (
                  <CurrentUser
                    userId={selectedUserId}
                    onClearUser={this.clearUser}
                  />
                )
                : 'No user selected'
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
