import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos, getUser } from './api';
import { Todo } from './types/todo';
import { User } from './types/user';

interface State {
  selectedUserId: number;
  user: User | null,
  todos: Todo[];
  title: string,
  filterBy: string;
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
    user: null,
    title: '',
    filterBy: 'all',
  };

  componentDidMount() {
    getTodos()
      .then(todosFromServer => {
        this.setState({ todos: todosFromServer });
      });
  }

  selectUser = (id: number) => {
    if (this.state.selectedUserId !== id) {
      getUser(id)
        .then(userFromServer => {
          this.setState({ user: userFromServer, selectedUserId: id });
        });
    }
  };

  clearUser = () => {
    this.setState({ user: null, selectedUserId: 0 });
  };

  handleCnange = (event: any) => {
    const { name, value } = event.target;

    this.setState(state => ({ ...state, [name]: value }));
  };

  filterTodos = () => {
    let filterTodos = [...this.state.todos];

    if (this.state.filterBy === 'completed') {
      filterTodos = filterTodos.filter(todo => todo.completed === true);
    }

    if (this.state.filterBy === 'active') {
      filterTodos = filterTodos.filter(todo => todo.completed === false);
    }

    return filterTodos.filter(todo => {
      return todo.title.toLocaleLowerCase().includes(this.state.title.toLocaleLowerCase());
    });
  };

  render() {
    const { selectedUserId, user } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <nav className="search__nav">
            <input
              type="text"
              name="title"
              id="title"
              value={this.state.title}
              onChange={this.handleCnange}
              placeholder="filter the todos by title"
            />
            <select name="filterBy" id="filter" value={this.state.filterBy} onChange={this.handleCnange}>
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="active">Active</option>
            </select>
          </nav>
          <TodoList
            todos={this.filterTodos()}
            selectUser={this.selectUser}
            selectedId={selectedUserId}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId && user ? (
              <CurrentUser user={user} clearUser={this.clearUser} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
