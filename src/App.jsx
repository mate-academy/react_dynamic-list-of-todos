import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { request } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  async componentDidMount() {
    const todos = await request('/todos');

    this.setState({ todos });
  }

  selectUser = (userId) => {
    this.setState({
      selectedUserId: userId,
    });
  }

  deselectUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  render() {
    const { todos, selectedUserId } = this.state;
    const { selectUser, deselectUser } = this;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            onSelect={selectUser}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                onDeselect={deselectUser}
              />
            ) : 'no user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
