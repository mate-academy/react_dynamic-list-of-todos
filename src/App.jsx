import React from 'react';
import './App.scss';
import './styles/general.scss';
import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  async componentDidMount() {
    const tasks = await getTodos();

    this.setState({ todos: tasks.data });
  }

  selectUser = (id) => {
    this.setState({ selectedUserId: id });
  }

  clearUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList todos={todos} selectUser={this.selectUser} />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <>
                <CurrentUser userId={selectedUserId} />
                <button
                  type="button"
                  onClick={this.clearUser}
                >
                  Clear
                </button>
              </>
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
