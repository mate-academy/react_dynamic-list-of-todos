import React from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { Search } from './components/Search';
import { CurrentUser } from './components/CurrentUser';
import { getTodos, getUsers } from './api/api';

class App extends React.Component {
  state = {
    todosNew: [],
    todos: [],
    users: [],
    selectedUserId: 0,
    input: '',
    select: '',
  };

  componentDidMount = () => {
    getTodos()
      .then(todos => this.setState({
        todos,
        todosNew: todos,
      }));

    getUsers()
      .then(users => this.setState({ users }));
  }

  changeSelectedUserId = (event) => {
    this.setState({ selectedUserId: event.target.value });
  }

  clearUserInfo = () => {
    this.setState({ selectedUserId: false });
  }

  hendleFilter = (event) => {
    const { name, value } = event.target;
    const { todos } = this.state;

    this.setState({ [name]: value });

    if (name === 'input') {
      this.setState({
        todosNew: todos.filter(todo => todo.title !== null
          && todo.title.includes(value)),
      });
    }

    if (name === 'select') {
      switch (value) {
        case 'active':
          this.setState({ todosNew: todos.filter(todo => !todo.completed) });
          break;
        case 'completed':
          this.setState({ todosNew: todos.filter(todo => todo.completed) });
          break;
        default:
          this.setState({ todosNew: todos });
      }
    }
  }

  render() {
    const {
      todosNew,
      users,
      selectedUserId,
      input,
      select,
    } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <Search
            text={input}
            changeList={this.hendleFilter}
            selectValue={select}
          />
          <TodoList
            todos={todosNew}
            userDeteil={this.changeSelectedUserId}
          />
        </div>

        <div className="App__content">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              users={users}
              clearInfo={this.clearUserInfo}
            />
          ) : 'No user selected'}
        </div>
      </div>
    );
  }
}

export default App;
