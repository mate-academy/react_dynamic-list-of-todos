import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { loadTodos } from './api';

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
    const data = await loadTodos();

    this.setState({
      todos: data,
    });
  }

  handleUserSelection = (userId: number) => {
    this.setState({ selectedUserId: userId });
  };

  changeUserId = () => {
    this.setState({ selectedUserId: 0 });
  };

  render() {
    const { selectedUserId, todos } = this.state;

    if (this.state.todos.length === 0) {
      return 'Loading todos...';
    }

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            onUserSelection={this.handleUserSelection}
            todos={todos}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <>
                <CurrentUser
                  userId={selectedUserId}
                  changeUserId={this.changeUserId}
                />
              </>
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
