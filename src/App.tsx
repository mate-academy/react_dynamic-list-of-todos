import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

interface State {
  selectedUserId: number;
  todos: Todo[],
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({
      todos,
    });
  }

  selectUser = (userId: number) => {
    this.setState({ selectedUserId: userId });
  };

  removeUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  };

  render() {
    const { selectedUserId, todos } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList todos={todos} selectUser={this.selectUser} />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser userId={selectedUserId} removeUser={this.removeUser} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
