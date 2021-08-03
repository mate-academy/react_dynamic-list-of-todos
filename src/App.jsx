import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { request } from './api/request';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    request('todos')
      .then(todos => todos.filter(todo => todo.title))
      .then(todos => this.setState({ todos }));
  }

  selectUserId = (userId) => {
    this.setState({ selectedUserId: userId });
  }

  onClear = () => {
    this.setState({ selectedUserId: 0 });
  }

  render() {
    const {
      todos,
      selectedUserId,
    } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectedUserId={selectedUserId}
            onClick={this.selectUserId}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                onClick={this.onClear}
                userId={selectedUserId}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
