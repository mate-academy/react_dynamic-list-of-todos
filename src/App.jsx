import React from 'react';
import './App.scss';
import './styles/general.scss';
import { Form } from './components/Form';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

import { getUsers, getTodos } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    users: [],
    filteredTodos: [],
    selectedUserId: 0,
    query: '',
    selectedStatus: '',
  };

  async componentDidMount() {
    const [todos, users] = await Promise.all([getTodos(), getUsers()]);

    this.setState({
      todos,
      users,
      filteredTodos: todos,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query
      || prevState.selectedStatus !== this.state.selectedStatus) {
      this.loadedTodos();
    }
  }

  changeQuery = (value) => {
    this.setState({ query: value });
  }

  changeSelectedStatus = (value) => {
    this.setState({ selectedStatus: value });
  }

  filterByQuery = (todos, query) => {
    if (query) {
      return todos.filter(({ title }) => (
        title.includes(query.toLowerCase())
      ));
    }

    return todos;
  };

  filterByStatus = (todos, selectedStatus) => {
    switch (selectedStatus) {
      case 'Acive':
        return todos.filter(({ completed }) => !completed);

      case 'Completed':
        return todos.filter(({ completed }) => completed);

      default:
        return todos;
    }
  }

  selectUser = (userId) => {
    const { selectedUserId } = this.state;

    if (selectedUserId !== userId) {
      this.setState({ selectedUserId: userId });
    }
  }

  resetUser = () => {
    this.setState({ selectedUserId: 0 });
  }

  loadedTodos = () => {
    const { todos, query, selectedStatus } = this.state;

    const filteredByQuery
      = this.filterByQuery(todos, query);
    const filteredTodos
      = this.filterByStatus(filteredByQuery, selectedStatus);

    this.setState({ filteredTodos });
  }

  render() {
    const {
      users,
      filteredTodos,
      selectedUserId,
      query,
      selectedStatus,
    } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <Form
            query={query}
            selectedStatus={selectedStatus}
            onChangeQuery={this.changeQuery}
            onChangeSelectedStatus={this.changeSelectedStatus}
          />
          <TodoList
            filteredTodos={filteredTodos}
            selectedUser={this.selectUser}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId
              ? (
                <CurrentUser
                  user={users.find(({ id }) => id === selectedUserId)}
                  resetUser={this.resetUser}
                />
              )
              : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
