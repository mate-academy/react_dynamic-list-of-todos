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

  selectUser = (userId, event) => {
    if (userId !== this.state.selectedUserId) {
      this.setState({ selectedUserId: userId });
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
    const { todos, selectedUserId, titleFilter, todoStatus } = this.state;

    const formatedList = todos
      .filter(todo => !Object.values(todo).includes(null))
      .filter(todo => todo.title.includes(titleFilter))
      .filter((todo) => {
        switch (todoStatus) {
          case ('all'):
            return true;
          case (todo.completed.toString()):
            return true;
          default:
            return false;
        }
      });

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
            todos={formatedList}
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
