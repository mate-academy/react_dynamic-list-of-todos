import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

import { request } from './api';

type State = {
  todos: Todo[];
  selectedUserId: number;
  title: string,
  status: string,
};

class App extends React.Component<{}, State> {
  state: State = {
    todos: [],
    selectedUserId: 0,
    title: '',
    status: 'all',
  };

  async componentDidMount() {
    const todos = await request();

    this.setState({ todos });
  }

  selectUser = (userId: number) => {
    this.setState({ selectedUserId: userId });
  };

  clearUserInfo = () => {
    this.setState({ selectedUserId: 0 });
  };

  getStatus = (status: string) => {
    switch (status) {
      case 'completed':
        return true;
      case 'active':
        return false;
      default:
        return 'all';
    }
  };

  changeTodoStatus = (id: number) => {
    const { todos } = this.state;

    const copy = [...todos].map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    this.setState(() => ({
      todos: copy,
    }));
  };

  filterTitle = (todo: Todo) => {
    const { status, title } = this.state;

    if (this.getStatus(status) === 'all') {
      return (todo.title.includes(title));
    }

    return (todo.title.includes(title)
      && todo.completed === this.getStatus(status));
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    this.setState(state => ({
      ...state,
      [name]: value,
    }));
  };

  render() {
    const { selectedUserId, todos } = this.state;
    const visibleTodos = todos.filter(this.filterTitle);

    return (
      <div className="App">
        <div className="App__sidebar">

          <input
            className="input is-primary"
            placeholder="Wrire a title"
            name="title"
            type="text"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <div className="select is-primary">
            <select
              name="status"
              value={this.state.status}
              onChange={this.handleChange}
            >
              <option value="all">all</option>
              <option value="completed">completed</option>
              <option value="active">active</option>
            </select>
          </div>

          <TodoList
            todos={visibleTodos}
            selectUser={this.selectUser}
            changeTodoStatus={this.changeTodoStatus}
          />
        </div>

        {
          todos.length > 0 && (
            <div className="App__content">
              <div className="App__content-container">
                {selectedUserId ? (
                  <CurrentUser
                    userId={this.state.selectedUserId}
                    clearUser={this.clearUserInfo}
                  />
                ) : (
                  <div className="content is-large has-text-centered has-text-weight-bold">
                    No user selected
                  </div>
                )}
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

export default App;
