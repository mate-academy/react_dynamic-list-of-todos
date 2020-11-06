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
    const todos = await getAllTodos();

    this.setState(state => ({
      ...state,
      todos,
    }));
  }

  clear = () => {
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
          {todos.length ? (
            <TodoList
              allTodos={todos}
              onUserSelect={this.selectUserId}
            />
          ) : 'There are no todos'}
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser userId={selectedUserId} onClear={this.clear} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
