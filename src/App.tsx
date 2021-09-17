import React from 'react';
import './App.scss';
import './styles/general.scss';
import { loadTodos } from './api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

interface State {
  todos: Todo[];
  selectedUserId: number;
}

class App extends React.Component<{}, State> {
  state: State = {
    todos: [],
    selectedUserId: 0,
  };

  async componentDidMount() {
    const todos = await loadTodos();

    this.setState({ todos });
  }

  handleClick = (userId: number) => {
    this.setState({ selectedUserId: userId });
  };

  render() {
    const { selectedUserId, todos } = this.state;

    // eslint-disable-next-line no-console
    console.log(todos);

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            onUserSelection={this.handleClick}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                handleClick={this.handleClick}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
