import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({ todos });
  }

  onUserSelect = (event) => {
    const selectedUserId = Number(event.target.innerText.split('#')[1]);

    this.setState({ selectedUserId });
  }

  onUserClear = () => this.setState({ selectedUserId: 0 })

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectedUserId={selectedUserId}
            onUserSelect={this.onUserSelect}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                onUserClear={this.onUserClear}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
