import React, { ChangeEvent } from 'react';
import { Todo } from './types/Todo';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getAllTodos } from './api';

interface State {
  selectedUserId: number;
  todos: Todo[];
  filterByTitle: string,
  filterByStatus: string,
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
    filterByTitle: '',
    filterByStatus: 'all',
  };

  async componentDidMount() {
    getAllTodos()
      .then(todos => {
        this.setState({ todos });
      });
  }

  selectUser = (userId: number) => {
    this.setState({ selectedUserId: userId });
  };

  clearUserInfo = () => {
    this.setState({ selectedUserId: 0 });
  };

  changeTodoStatus = (id: number) => {
    const todoCopy = this.state.todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    this.setState(() => ({
      todos: todoCopy,
    }));
  };

  callbackFilterTitle = (todo: Todo) => {
    const { title, completed } = todo;

    if (this.filterByStatusResult(this.state.filterByStatus) === 'all') {
      return (title.includes(this.state.filterByTitle));
    }

    return (title.includes(this.state.filterByTitle)
      && completed === this.filterByStatusResult(this.state.filterByStatus));
  };

  filterByStatusResult = (status: string) => {
    switch (status) {
      case 'completed':
        return true;
      case 'active':
        return false;
      default:
        return 'all';
    }
  };

  changeFilterTitle = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ filterByTitle: event.target.value });
  };

  changeFilterByStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ filterByStatus: event.target.value });
  };

  render() {
    const { selectedUserId } = this.state;
    const visibleTodos = this.state.todos.filter(this.callbackFilterTitle);

    return (
      <div className="App">
        <div className="App__sidebar">
          <span>Filter title</span>
          <input type="text" value={this.state.filterByTitle} onChange={this.changeFilterTitle} />
          <select value={this.state.filterByStatus} onChange={this.changeFilterByStatus}>
            <option value="all">all</option>
            <option value="completed">completed</option>
            <option value="active">active</option>
          </select>
          <TodoList
            todos={visibleTodos}
            selectUser={this.selectUser}
            changeTodoStatus={this.changeTodoStatus}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={this.state.selectedUserId}
                clearUserInfo={this.clearUserInfo}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
