import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import './styles/general.scss';

import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { loadTodos } from './api';

interface State {
  selectedUserId: number;
  todos: Todo[];
  error: boolean;
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
    error: false,
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    try {
      const todos = await loadTodos();

      this.setState({
        todos,
        error: false,
      });
    } catch {
      this.setState({
        error: true,
      });
    }
  };

  selectUser = (userId: number) => {
    this.setState({
      selectedUserId: userId,
    });
  };

  clearSelectedUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  };

  render() {
    const { selectedUserId, todos, error } = this.state;

    return (
      error ? (
        <h2>Ups... Something went wrong</h2>
      ) : (
        <div className="App">
          <div className="App__sidebar">
            <TodoList
              todos={todos}
              selectUser={this.selectUser}
            />
          </div>

          <div className="App__content">
            <div className="App__content-container">
              {selectedUserId ? (
                <CurrentUser
                  userId={selectedUserId}
                  clearSelectedUser={this.clearSelectedUser}
                />
              ) : 'No user selected'}
            </div>
          </div>
        </div>
      )
    );
  }
}

export default App;
