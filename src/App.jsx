import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { loadTodos } from './api/api';
import { Loader } from './components/Loader/Loader';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    loadTodos()
      .then(todos => this.setState({ todos }));
  }

  selectUser = (userId) => {
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
          {!!todos.length && (
            <TodoList
              todos={ todos }
              selectUser={ this.selectUser }
              selectedUserId={ selectedUserId }
          />) }
          {todos.length === 0 && (
            <Loader />
          )}
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId !== 0 ? (
              <CurrentUser
                clearUser={this.clearUser}
                selectedUserId={selectedUserId}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
