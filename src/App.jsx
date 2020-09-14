import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodoData, getUserData } from './api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    currentFilterValue: '',
    currentSelectValue: 'all',
  };

  componentDidMount() {
    getTodoData()
      .then(todoData => this.setState({ todos: todoData }));
  }

  selectUser = (userId) => {
    this.setState({
      selectedUserId: userId,
    });
  }

  clearUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  controlFilter = (value) => {
    this.setState({
      currentFilterValue: value,
    });
  }

  controlSelect = (value) => {
    this.setState({
      currentSelectValue: value,
    });
  }

  render() {
    const
      { todos,
        selectedUserId,
        currentFilterValue,
        currentSelectValue } = this.state;

    let filteredTodos = todos;

    switch (currentSelectValue) {
      case 'active':
        filteredTodos = todos.filter(todo => todo.completed === false);
        break;
      case 'completed':
        filteredTodos = todos.filter(todo => todo.completed === true);
        break;
      default:
        break;
    }

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={filteredTodos}
            selectUser={this.selectUser}
            selectedUserId={selectedUserId}
            controlFilter={this.controlFilter}
            currentFilterValue={currentFilterValue}
            controlSelect={this.controlSelect}
          />
        </div>
        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                getUserData={getUserData}
                clearUser={this.clearUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
