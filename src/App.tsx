import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { users } from './api/api';
import { Select } from './components/Select/Select';
import { Input } from './components/Input/Input';

interface State {
  selectedUserId: number,
  todosUsers: Todo[],
  findTitle: string,
}

class App extends React.PureComponent<{}, State> {
  todosStorage: Todo[] = [];

  currentTodosUsers: Todo[] = [];

  state: State = {
    selectedUserId: 0,
    todosUsers: [{
      id: 74,
      userId: 4,
      completed: false,
      title: '',
      createdAt: '',
      updatedAt: '',
    }],
    findTitle: '',
  };

  async componentDidMount() {
    const response = await users();

    this.todosStorage = response;

    this.currentTodosUsers = response;

    this.setState({ todosUsers: response });
  }

  selectedUserId = (userId: number) => {
    this.setState({ selectedUserId: userId });
  };

  selectedUsers = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    switch (value) {
      case 'Active':
        this.currentTodosUsers = this.todosStorage.filter(todoUser => todoUser.completed === false);
        this.setState({
          todosUsers: this.currentTodosUsers,
        });
        break;
      case 'Completed':
        this.currentTodosUsers = this.todosStorage.filter(todoUser => todoUser.completed === true);
        this.setState({
          todosUsers: this.currentTodosUsers,
        });
        break;
      default:
        this.currentTodosUsers = this.todosStorage;
        this.setState({ todosUsers: this.currentTodosUsers });
        break;
    }
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const filterTodo = this.currentTodosUsers
      .filter(todoUser => todoUser.title.includes(value));

    this.setState({
      todosUsers: filterTodo,
      findTitle: value,
    });
  };

  clearSelectedUserId = () => {
    this.setState({ selectedUserId: 0 });
  };

  render() {
    const { selectedUserId } = this.state;

    return (
      <>
        <div className="App">
          <div className="App__sidebar">
            <Select selectedUsers={this.selectedUsers} />
            <Input
              handleChange={this.handleChange}
              findTitle={this.state.findTitle}
            />
            <TodoList
              todosUsers={this.state.todosUsers}
              selectedUserId={this.selectedUserId}
              currentUserId={this.state.selectedUserId}
            />
          </div>

          <div className="App__content">
            <div className="App__content-container">
              {selectedUserId ? (
                <CurrentUser
                  userId={this.state.selectedUserId}
                  clearSelectedUserId={this.clearSelectedUserId}
                />
              ) : 'No user selected'}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
