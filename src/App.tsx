import React from 'react';
import './App.scss';
import './styles/general.scss';
import { getAllTodos, getUser } from './components/Api/Api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

type Props = {};
interface State {
  selectedUserId: number;
  todos: Todo[];
  selectedUserInfo: User | null;
  sortByStatus: string;
  sortByName: string;
}

class App extends React.Component<Props, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
    selectedUserInfo: null,
    sortByStatus: 'all',
    sortByName: '',
  };

  componentDidMount() {
    getAllTodos()
      .then(todos => {
        this.setState({
          todos: [...todos],
        });
      });
  }

  componentDidUpdate(prevState: State) {
    if (prevState.sortByStatus !== this.state.sortByStatus) {
      this.sortByStatus(this.state.sortByStatus);
    }

    // if (prevState.sortByName !== this.state.sortByName) {
    //   this.handelSortByName(this.state.sortByName);
    // }
  }

  // handelSortByName = (value: string) => {
  //   this.setState({
  //     todos: this.state.todos.filter(todo => value.includes(todo.title)),
  //   });
  // };

  sortByStatus = (status: string) => {
    switch (status) {
      case 'all':
        getAllTodos()
          .then(todos => {
            this.setState({
              todos: [...todos],
            });
          });
        break;

      case 'completed':
        getAllTodos()
          .then(todos => {
            this.setState({
              todos: [...todos].filter(todo => todo.completed),
            });
          });
        break;

      case 'notCompleted':
        getAllTodos()
          .then(todos => {
            this.setState({
              todos: [...todos].filter(todo => !todo.completed),
            });
          });
        break;

      default:
    }
  };

  handleSelectUser = (userId: number) => {
    this.setState({
      selectedUserId: userId,
    });

    if (userId !== this.state.selectedUserId) {
      getUser(userId).then(user => {
        this.setState({
          selectedUserInfo: user,
        });
      });
    }
  };

  clearSelectedUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  };

  handleSelectSortBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({
      sortByStatus: value,
    });
  };

  handleSortByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({
      sortByName: value,
    });
  };

  render() {
    const { selectedUserId, todos, selectedUserInfo } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <span>
            Status:
            <select
              value={this.state.sortByStatus}
              onChange={this.handleSelectSortBy}
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="notCompleted">Not completed</option>
            </select>
            <br />
            Find by name:
            <input
              type="text"
              value={this.state.sortByName}
              onChange={this.handleSortByName}
            />
          </span>
          <TodoList
            todos={todos}
            selectedUserId={selectedUserId}
            handleSelectUser={this.handleSelectUser}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId >= 3 && selectedUserInfo !== null ? (
              <CurrentUser
                selectedUser={selectedUserInfo}
                clearSelectedUser={this.clearSelectedUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
