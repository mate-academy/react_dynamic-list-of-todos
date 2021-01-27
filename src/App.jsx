import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './data/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    shuffle: false,
  };

  async componentDidMount() {
    const response = await getTodos();

    this.setState({
      todos: response.data.filter(todo => todo.userId),
    });
  }

  selectUser = (userId) => {
    this.setState({ selectedUserId: userId });
  }

  clearSelectedUser = () => {
    this.setState({ selectedUserId: 0 });
  };

  toShuffle = () => {
    this.setState(state => ({
      shuffle: !state.shuffle,
    }));
  }

  render() {
    const { todos, selectedUserId, shuffle } = this.state;

    if (shuffle) {
      todos.sort(() => Math.random() - 0.5);
    }

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectUser={this.selectUser}
            toShuffle={this.toShuffle}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clearUser={this.clearSelectedUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
