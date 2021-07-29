import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    selectedTitle: '',
    selectedByStatus: 'all',
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({ todos });
  }

  changeSelectedUser = (userId) => {
    this.setState({
      selectedUserId: userId,
    });
  }

  clearUserSelection = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  selectByTitle = (event) => {
    this.setState({
      selectedTitle: event.target.value,
    });
  }

  selectByStatus = (event) => {
    this.setState({
      selectedByStatus: event.target.value,
    });
  }

  filterTodosCallback = arr => arr.filter((item) => {
    if (this.state.selectedByStatus === 'active') {
      return item.completed === false;
    }

    if (this.state.selectedByStatus === 'completed') {
      return item.completed === true;
    }

    return item;
  }).filter(item => item.title !== null
      && item.title.includes(this.state.selectedTitle))

  render() {
    const {
      todos,
      selectedUserId,
      selectedTitle,
      selectedByStatus,
    } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={this.filterTodosCallback(todos)}
            onCLick={this.changeSelectedUser}
            title={selectedTitle}
            onChange={this.selectByTitle}
            selectedByStatus={selectedByStatus}
            onChangeByStatus={this.selectByStatus}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                onClick={this.clearUserSelection}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
