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

  selectUser = (userId: number) => {
    this.setState({ selectedUserId: userId });
  };

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  };

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectUser={this.selectUser}
            selectedUserId={selectedUserId}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                selectedUserId={selectedUserId}
                clear={this.clearUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
