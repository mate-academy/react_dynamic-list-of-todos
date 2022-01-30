import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

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

  deleteUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  };

  randomSort = () => {
    this.setState((state) => ({
      todos: [...state.todos].sort(() => 0.5 - Math.random()),
    }));
  };

  render() {
    const { selectedUserId, todos } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectUser={(userId: number) => {
              this.setState({
                selectedUserId: userId,
              });
            }}
            randomSort={this.randomSort}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                deleteUser={this.deleteUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
