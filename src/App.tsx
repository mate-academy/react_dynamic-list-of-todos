import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { Todo } from './react-app-env';

interface State {
  selectedUserId: number;
  todos: Todo[],
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
  };

  componentDidMount() {
    fetch('https://mate.academy/students-api/todos')
      .then(response => response.json())
      .then(todos => {
        this.setState({ todos });
      });
  }

  selectUser = (userId: number) => {
    this.setState({ selectedUserId: userId });
  };

  onClear = () => {
    this.setState({ selectedUserId: 0 });
  };

  render() {
    const { selectedUserId, todos } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            onSelectUserID={this.selectUser}
            selectID={selectedUserId}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clearUser={this.onClear}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
