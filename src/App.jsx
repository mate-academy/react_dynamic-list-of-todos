import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { request } from './utils';

class App extends React.Component {
  state = {
    initialtodos: [],
    todos: [],
    selectedUserId: 0,
    selectedUser: null,
    filteredBy: '',
    filterPhrase: '',
  };

  async componentDidMount() {
    const todos = await request('/todos');
    const initialTodos = todos.filter(todo => todo.title
      && todo.userId
      && typeof todo.completed !== 'object');

    this.setState({
      todos: initialTodos,
      initialtodos: initialTodos,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      initialtodos,
      selectedUserId,
      filteredBy,
      filterPhrase,
    } = this.state;

    if (prevState.selectedUserId !== selectedUserId) {
      this.setUser();
    }

    if (prevState.filteredBy !== filteredBy) {
      this.setFilterMethod(
        filteredBy, 'todos', initialtodos,
      );
    }

    if (prevState.filterPhrase !== filterPhrase) {
      this.setFilterMethod(
        filterPhrase, 'todos', initialtodos, filterPhrase,
      );
    }
  }

  async setUser() {
    const selectedUser = await
    // eslint-disable-next-line react/no-access-state-in-setstate
    request('/users', `/${this.state.selectedUserId}`);

    this.setState({ selectedUser });
  }

  handleChanges = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  setFilterMethod = (method, stateName, initialStateField, condition = '') => {
    if (method === this.state.filteredBy) {
      switch (method) {
        case 'completed':
          this.setState({
            [stateName]: initialStateField.filter(todo => todo.completed),
          });
          break;

        case 'inProgress':
          this.setState({
            [stateName]: initialStateField.filter(todo => !todo.completed),
          });
          break;
        case 'all':
          this.setState({
            [stateName]: initialStateField,
          });
          break;
        default:
      }
    }

    if (method === this.state.filterPhrase) {
      this.setState({
        [stateName]: initialStateField
          .filter(
            item => item.title.toLowerCase().includes(condition.toLowerCase()),
          ),
      });
    }
  }

  resetUser = () => {
    this.setState({ selectedUserId: 0 });
  }

  render() {
    const {
      todos,
      selectedUser,
      selectedUserId,
      filterPhrase,
      filteredBy,
    } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <input
            type="text"
            placeholder="Find Ur todo..."
            name="filterPhrase"
            value={filterPhrase}
            onChange={this.handleChanges}
          />
          <select
            name="filteredBy"
            value={filteredBy}
            onChange={this.handleChanges}
          >

            <option value="all">
              all
            </option>
            <option value="completed">
              completed
            </option>
            <option value="inProgress">
              in progress
            </option>

          </select>
          <TodoList todos={todos} onClick={this.handleChanges} />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUser ? (
              <CurrentUser userId={selectedUserId} user={selectedUser} />
            ) : 'No user selected'}
          </div>
          {!!selectedUserId && (
            <button
              type="button"
              onClick={this.resetUser}
              className="button"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default App;
