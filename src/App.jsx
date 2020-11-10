import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getAllTodos } from './api';

class App extends React.PureComponent {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  async componentDidMount() {
    const todos = (await getAllTodos())
      .filter(({ title, completed, userId }) => title && userId);

    this.setState(state => ({
      ...state,
      todos,
    }));
  }

  clearSelectUserId = () => {
    this.selectUserId(0);
  }

  selectUserId = (id) => {
    this.setState(state => ({
      ...state,
      selectedUserId: id,
    }));
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          {todos.length > 0 ? (
            <TodoList
              allTodos={todos}
              onUserSelect={this.selectUserId}
            />
          ) : 'There are no todos'}
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                onClear={this.clearSelectUserId}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
