import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { UserTodos, users } from './utils';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    user: {},
    inputValue: '',
    selectValue: '',
    completed: null,
  };

  componentDidMount() {
    UserTodos()
      .then(todos => this.setState({
        todos,
      }));
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedUserId } = this.state;

    if (prevState.selectedUserId !== selectedUserId) {
      users(selectedUserId)
        .then((user) => {
          if (user.data !== null && user.data !== undefined) {
            this.setState({ user: user.data });
          }
        });
    }
  }

  showUser = (event) => {
    this.setState({ selectedUserId: event.target.name });
  }

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  }

  onChange = (event) => {
    const { value } = event.target;

    this.setState({
      inputValue: value,
    });
  }

  onChangeStatus = (event) => {
    const { value } = event.target;

    switch (value) {
      case 'all':
        this.setState({
          selectValue: value,
          completed: null,
        });
        break;

      case 'completed':
        this.setState({
          selectValue: value,
          completed: false,
        });
        break;

      case 'not completed':
        this.setState({
          selectValue: value,
          completed: true,
        });
        break;

      default:
        break;
    }
  }

  render() {
    const {
      todos,
      selectedUserId,
      user,
      inputValue,
      selectValue,
      completed,
    } = this.state;

    const filteredTodos = todos.filter(
      todo => todo.title.includes(inputValue),
    ).filter(todo => todo.completed !== completed);

    return (
      <div className="App">
        <div className="App__sidebar">
          <input
            value={inputValue}
            onChange={this.onChange}
            placeholder="Search"
          />
          <select onChange={this.onChangeStatus} value={selectValue}>
            <option value="all">
              Show all
            </option>
            <option value="completed">
              Completed
            </option>
            <option value="not completed">
              Not completed
            </option>
          </select>
          <TodoList todos={filteredTodos} onClick={this.showUser} />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                user={user}
                onClick={this.clearUser}
              />
            ) : (
              <h1 className="title">No selected user</h1>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
