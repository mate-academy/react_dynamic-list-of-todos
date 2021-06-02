import React from 'react';
import './App.scss';
import './styles/general.scss';
import getResponse from './api/api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

const url = 'https://mate-api.herokuapp.com/todos';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    titleFilter: '',
    todoStatus: 'all',
  };

  componentDidMount() {
    getResponse(url)
      .then((todos) => {
        this.setState({ todos });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      getResponse(url)
        .then((todos) => {
          const filteredTodos = todos
            .filter(todo => !Object.values(todo).includes(null))
            .filter(todo => todo.title.includes(this.state.titleFilter))
            .filter((todo) => {
              switch (this.state.todoStatus) {
                case ('all'):
                  return true;
                case (todo.completed.toString()):
                  return true;
                default:
                  return false;
              }
            });

          this.setState({ todos: filteredTodos });
        });
    }
  }

  selectUser = (userId, event) => {
    if (event.target.checked) {
      this.setState({ selectedUserId: userId });
    } else {
      this.setState({ selectedUserId: 0 });
    }
  }

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  }

  inputHandler = (event) => {
    this.setState({ titleFilter: event.target.value });
  }

  selectHandler = (event) => {
    this.setState({ todoStatus: event.target.value });
  }

  render() {
    const { todos, selectedUserId, titleFilter } = this.state;

    return (
      <div className="App">
        <div className="searchWrap">
          <label htmlFor="">
            TODO name:
            <input
              type="text"
              value={titleFilter}
              onChange={this.inputHandler}
            />
          </label>
          <select onChange={this.selectHandler}>
            <option value="all">All</option>
            <option value>Finished</option>
            <option value={false}>Unfinished</option>
          </select>
        </div>
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectUser={this.selectUser}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
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
