import React from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { Search } from './components/Search';
import { CurrentUser } from './components/CurrentUser';
import { getTodos, getUsers } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    users: [],
    user: {},
    selectedUserId: 0,
    input: '',
    select: '',
  };

  componentDidMount = () => {
    getTodos()
      .then(todos => this.setState({ todos }));

    getUsers()
      .then(users => this.setState({ users }));
  }

  changeSelectedUserId = (event) => {
    const { users } = this.state;
    const { value } = event.target;
    const user = { ...users.find(us => us.id === +value) };

    this.setState({
      user,
      selectedUserId: value,
    });
  }

  clearUserInfo = () => {
    this.setState({ selectedUserId: false });
  }

  handleFilter = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  render() {
    const {
      todos,
      user,
      selectedUserId,
      input,
      select,
    } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <Search
            text={input}
            changeList={this.handleFilter}
            selectValue={select}
          />
          <TodoList
            todos={todos}
            userDeteil={this.changeSelectedUserId}
            input={input}
            select={select}
          />
        </div>

        <div className="App__content">
          {selectedUserId ? (
            <CurrentUser
              {...user}
              clearInfo={this.clearUserInfo}
            />
          ) : 'No user selected'}
        </div>
      </div>
    );
  }
}

export default App;
