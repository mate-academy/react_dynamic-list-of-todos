import React from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getAll, getUser } from './api';

class App extends React.Component {
  state = {
    todos: [],
    saveId: 0,
    selectedUserId: 0,
    todoStart: '',
    id: 0,
  };

  resetUser = () => {
    this.setState({
      selectedUserId: 0,
      saveId: 0,
    });
  }

  componentDidMount = () => {
    getAll().then(todo => (
      this.setState(
        { todos: todo.data },
      )
    ));
  }

  selectUser = (userId) => {
    if (!userId) {
      this.setState({
        saveId: 0,
        selectedUserId: 0,
      });
    } else {
      this.setState(state => ({
        saveId: state.selectedUserId,
        selectedUserId: userId,
      }));
    }
  }

  componentDidUpdate = () => {
    if (this.state.saveId !== this.state.selectedUserId) {
      const getUserProps = async() => {
        const items = await getUser(this.state.selectedUserId);

        if (items.data) {
          this.setState(state => ({
            id: items.data.id,
            name: items.data.name,
            email: (items.data.email) ? items.data.email : 'no email',
            phone: (items.data.phone) ? items.data.phone : 'no phone',
            saveId: state.selectedUserId,
          }));
        }
      };

      getUserProps();
    }
  }

  filterTodosByTitle = (value) => {
    this.setState({
      todoStart: value,
    });
  }

  filterTodosByCompleteness = (value) => {
    switch (value) {
      case 'Active':
        this.setState({
          completed: false,
        });
        break;

      case 'Completed':
        this.setState({
          completed: true,
        });
        break;

      default:
        this.setState({
          completed: null,
        });
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
          {selectedUserId && name ? (
            <CurrentUser
              userId={selectedUserId}
              resetUser={this.resetUser}
              id={id}
              name={name}
              email={email}
              phone={phone}
            />
          ) : 'No user selected'}
        </div>
      </div>
    );
  }
}

export default App;
