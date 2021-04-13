import React from 'react';

import './App.scss';
import './styles/general.scss';

import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos, getUsers } from './api';

export class App extends React.Component {
  state = {
    allTodos: [],
    todosVisible: [],
    selectedUserId: 0,
    user: {},
    errorData: true,
    searchValue: '',
    filterInfo: 'all',
  };

  async componentDidMount() {
    await getTodos()
      .then(todos => this.setState({
        allTodos: todos,
        todosVisible: todos,
      }));
  }

  selectUser = (userId) => {
    const { selectedUserId } = this.state;

    if (userId !== selectedUserId) {
      getUsers(userId)
        .then((needUser) => {
          if (needUser.data !== null) {
            this.setState({
              user: needUser.data,
              selectedUserId: userId,
              errorData: true,
            });
          } else {
            this.setState({
              selectedUserId: 0,
              errorData: false,
            });
          }
        });
    }
  }

  clear = () => {
    this.setState({
      selectedUserId: 0,
      user: {},
    });
  }

  search = (value) => {
    const { filterInfo } = this.state;
    const needTodos = this.filtered(filterInfo);
    const visible = needTodos.filter(todo => (
      todo.title.toLowerCase().includes(value.toLowerCase())
    ));

    this.setState({
      todosVisible: visible,
      searchValue: value,
    });
  }

  filtered = (value) => {
    const { allTodos, searchValue } = this.state;
    const needTodos = allTodos.filter(todo => (
      todo.title.toLowerCase().includes(searchValue.toLowerCase())
    ));
    let visible;

    if (value === 'completed') {
      visible = needTodos.filter(todo => (
        todo.completed === true
      ));
    }

    if (value === 'active') {
      visible = needTodos.filter(todo => (
        todo.completed === false
      ));
    }

    if (value === 'all') {
      visible = needTodos;
    }

    this.setState({
      todosVisible: visible,
      filterInfo: value,
    });

    return visible;
  }

  shuffle = () => {
    const { todosVisible } = this.state;
    const randomList = todosVisible;

    for (let i = randomList.length - 1; i > 0; i -= 1) {
      const random = Math.floor(Math.random() * (i + 1));
      // eslint-disable-next-line
      [randomList[i], randomList[random]] = [randomList[random], randomList[i]];
    }

    this.setState({ todosVisible: randomList });
  }

  render() {
    const { todosVisible, selectedUserId, user, errorData } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todosVisible={todosVisible}
            selectUser={this.selectUser}
            search={this.search}
            filtered={this.filtered}
            shuffle={this.shuffle}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                user={user}
                clear={this.clear}
              />
            ) : 'No user selected'}
            <p hidden={errorData}>
              No such user!
            </p>
          </div>
        </div>
      </div>
    );
  }
}
