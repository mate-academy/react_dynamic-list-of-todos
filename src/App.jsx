import React from 'react';
import './App.scss';
import './styles/general.scss';
import { getTodos } from '../src/components/api';
import { TodoList } from './components/TodoList/TodoList';
import { CurrentUser } from './components/CurrentUser';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  async componentDidMount() {
    const { data } = await getTodos();

    this.setState({ todos: data });
  }

  selectUser = (userId) => {
    const { selectedUserId } = this.state;

    if (selectedUserId === userId) {
      return;
    }

    this.setState({ selectedUserId: userId });
  }

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          {todos.length
            ? (
              <TodoList
                todos={todos}
                selectedUserId={selectedUserId}
                selectUser={this.selectUser}
              />
            )
            : <h2>No loaded todos</h2>
          }
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                selectedUserId={selectedUserId}
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
