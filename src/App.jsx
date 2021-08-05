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
    error: null,
  };

  componentDidMount() {
    request('/todos')
      .then((todos) => {
        this.setState({
          todos: todos.filter(
            todo => todo.title && todo.userId,
          ),
        });
      })
      .catch(error => this.setState({
        error: `ErrorMessage ${error.message}`,
      }));
  }

  selectUser = (userId) => {
    this.setState({
      selectedUserId: userId,
    });
  }

  clearId = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  render() {
    const { todos, selectedUserId, error } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          {todos.length
            ? (
              <TodoList
                todos={todos}
                selectUser={this.selectUser}
                selectedUserId={selectedUserId}
              />
            )
            : { error } && 'Todo list is loading...'
          }

        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId
              ? (
                <CurrentUser
                  userId={selectedUserId}
                  clearId={this.clearId}
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
