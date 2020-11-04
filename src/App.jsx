import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    isError: false,
    isLoading: false,
    selectedUserId: 0,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    try {
      const todos = await getTodos();

      this.setState({
        todos: todos.data,
        isError: false,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        isError: true,
        isLoading: false,
      });
    }
  }

  selectUser = (id) => {
    if (this.state.selectedUserId !== id) {
      this.setState({
        selectedUserId: id,
      });
    }
  }

  clearSelectedUser = () => {
    this.setState({ selectedUserId: 0 });
  }

  render() {
    const { todos, selectedUserId, isError, isLoading } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectUser={this.selectUser}
            selectedUserId={selectedUserId}
            isError={isError}
            isLoading={isLoading}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clear={this.clearSelectedUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
