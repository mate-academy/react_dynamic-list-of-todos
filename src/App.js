import React from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getAll, getUser } from './api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    todoStart: '',
    id: 0,
    noUserError: false,
  };

  resetUser = () => {
    this.setState({ selectedUserId: 0 });
  }

  componentDidMount = () => {
    getAll().then(todo => (
      this.setState({ todos: todo.data })
    ));
  }

  selectUser = (userId) => {
    if (!userId) {
      this.setState({ noUserError: true });
    } else {
      this.setState({
        selectedUserId: userId,
        noUserError: false,
      });
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.selectedUserId !== this.state.selectedUserId
        && this.state.selectedUserId) {
      const getUserProps = async() => {
        const items = await getUser(this.state.selectedUserId);

        if (!items.data) {
          this.setState({ noUserError: true });
        } else {
          this.setState({
            id: items.data.id,
            name: items.data.name,
            email: (items.data.email) ? items.data.email : 'no email',
            phone: (items.data.phone) ? items.data.phone : 'no phone',
          });
        }
      };

      getUserProps();
    }
  }

  filterTodosByTitle = (value) => {
    this.setState({ todoStart: value });
  }

  filterTodosByCompleteness = (value) => {
    switch (value) {
      case 'Active':
        this.setState({ completed: false });
        break;

      case 'Completed':
        this.setState({ completed: true });
        break;

      default:
        this.setState({ completed: null });
    }
  }

  render() {
    const {
      todos,
      selectedUserId,
      id,
      name,
      email,
      phone,
      todoStart,
      completed,
      noUserError,
    } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectUser={this.selectUser}
            todoStart={todoStart}
            filterTodosByTitle={this.filterTodosByTitle}
            filterTodosByCompleteness={this.filterTodosByCompleteness}
            completed={completed}
          />
        </div>

        <div className="App__content">
          {(selectedUserId && name) || noUserError ? (
            <CurrentUser
              userId={selectedUserId}
              resetUser={this.resetUser}
              id={id}
              name={name}
              email={email}
              phone={phone}
              noUserError={noUserError}
            />
          ) : 'No user selected'}
        </div>
      </div>
    );
  }
}

export default App;
