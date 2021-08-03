/* eslint-disable react/sort-comp */
import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { allTodos, allUsers } from './api/index';

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
    allTodos()
      .then(todos => this.setState({
        todos,
      }));
  }

  selectedUserId = (event) => {
    this.setState({ selectedUserId: event.target.name });
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedUserId } = this.state;
    console.log(prevState.selectedUserId, selectedUserId);

    if (prevState.selectedUserId === selectedUserId) {
      return;
    }

    if (prevState.selectedUserId !== selectedUserId) {
      allUsers(selectedUserId)
        .then((user) => {
          if (user.data !== null && user.data !== undefined) {
            this.setState({ user: user.data });
          } else {
            this.setState({ selectedUserId: null });
          }
        });
    }
  }

  onChange = (event) => {
    const { value } = event.target;

    this.setState({
      inputValue: value,
    });
  }

  onChangeSelect = (event) => {
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
            placeholder="Search by Title"
          />
          <select onChange={this.onChangeSelect} value={selectValue}>
            <option value="all">
              Show all
            </option>
            <option value="completed">
              Show only completed
            </option>
            <option value="not completed">
              Show only not completed
            </option>
          </select>
          <TodoList todos={filteredTodos} onClick={this.selectedUserId} />
        </div>

        <div className="App__content">
          {selectedUserId === null
            ? (
              <div className="App__content-container">
                Wrong User!!!
              </div>
            )
            : (
              <div className="App__content-container">
                {selectedUserId ? (
                  <CurrentUser userId={selectedUserId} user={user} />
                ) : 'No user selected'}
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default App;
