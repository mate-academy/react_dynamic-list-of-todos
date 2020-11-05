import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos, getUser } from './api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    selectedUser: null,
    filterQuery: '',
    selectValue: 'all',
  };

  callbacksForCompletedFilter = {
    all: () => true,
    active: completed => !completed,
    completed: completed => completed,
  }

  componentDidMount() {
    getTodos()
      .then((todos) => {
        this.setState({
          todos,
        });
      })
      // eslint-disable-next-line no-console
      .catch(err => console.warn(err));
  }

  async componentDidUpdate(prevProps, prevState) {
    const { selectedUserId } = this.state;

    if (prevState.selectedUserId !== selectedUserId) {
      this.changeSelectedUser(selectedUserId);
    }
  }

  changeSelectedUser = async(userId) => {
    try {
      const user = await getUser(userId);

      this.setState({
        selectedUser: user,
      });
    } catch (error) {
      this.setState({
        selectedUser: null,
      });
    }
  }

  changeUserId = (userId) => {
    this.setState({
      selectedUserId: userId,
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  resetSelectedUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  getFiltredTodos = () => {
    const { todos, filterQuery, selectValue } = this.state;

    return todos
      .filter(({ title, completed }) => {
        const titleInLowerCase = title.toLowerCase();
        const queryInLowerCase = filterQuery.toLowerCase();

        return titleInLowerCase.includes(queryInLowerCase)
          && this.callbacksForCompletedFilter[selectValue](completed);
      });
  }

  render() {
    const { selectedUser, filterQuery, selectValue, userId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={this.getFiltredTodos()}
            selectUserId={this.selectUserId}
            filterQuery={filterQuery}
            handleChange={this.handleChange}
            changeUserId={this.changeUserId}
            selectValue={selectValue}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUser ? (
              <CurrentUser
                userId={userId}
                user={selectedUser}
                resetUser={this.resetSelectedUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
