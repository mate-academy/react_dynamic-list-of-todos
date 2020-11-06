import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { Form } from './components/Form/Form';
import { loadTodos } from './api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    search: '',
    filter: 'all',
  };

  async componentDidMount() {
    const todos = await loadTodos();

    this.setState({ todos });
  }

  getUserId = (selectedUserId) => {
    this.setState({ selectedUserId });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { todos, selectedUserId, search, filter } = this.state;
    const regular = new RegExp(search, 'gim');
    const preparedTodos = todos.filter(({ title }) => (
      regular.test(title)
    ))
      .filter(({ completed }) => {
        switch (filter) {
          case 'all':
            return true;
          case 'active':
            return !completed;
          case 'completed':
            return completed;
          default:
            return true;
        }
      });

    return (
      <div className="App">
        <div className="App__form">
          <Form
            search={search}
            filter={filter}
            handleChange={this.handleChange}
          />
        </div>
        <div className="App__sidebar">
          <TodoList
            todos={preparedTodos}
            getUserId={this.getUserId}
            selectedUserId={selectedUserId}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                getUserId={this.getUserId}
                selectedUserId={selectedUserId}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
