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
      .then((todos) => {
        this.setState({
          todos,
        });
      });
  }

  clearUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  selecteUserId = (userId) => {
    this.setState({ selectedUserId: userId });
  }

  render() {
    const { todos, selectedUserId } = this.state;
    const { clearUser, selecteUserId } = this;

    return (
      <div className="App">
        <div className="App__sidebar">
          {this.state.todos.length !== 0
            ? (
              <TodoList
                todos={todos}
                selectedUserId={selectedUserId}
                onUserIdSelected={selecteUserId}
              />
            )
            : 'Loadind...'
          }

        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                onClick={clearUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
