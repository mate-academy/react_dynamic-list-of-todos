import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import GetAll, { getUser } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    currentUser: '',
    queryFilter: '',
    queryCategory: 'all',
  };

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const todos = await GetAll();

    this.setState({
      todos: todos.data,
    });
  }

  selectUser = id => async() => {
    const user = await getUser(id);

    this.setState({
      selectedUserId: id,
      currentUser: user.data,
    });
  }

  clearSelect = () => {
    this.setState({
      selectedUserId: 0,
      currentUser: '',
    });
  }

  setQueryText = (e) => {
    this.setState({
      queryFilter: e.target.value,
    });
  }

  setQueryCategory = (e) => {
    this.setState({
      queryCategory: e.target.value,
    });
  }

  textFilter = todos => todos.filter((todo) => {
    if (todo.title === null) {
      return false;
    }

    return todo.title.includes(this.state.queryFilter);
  });

  categoryFilter = todos => todos.filter((todo) => {
    if (this.state.queryCategory === 'all') {
      return true;
    }

    if (typeof todo.completed !== 'boolean') {
      return false;
    }

    if (todo.completed === true && this.state.queryCategory === 'true') {
      return true;
    }

    if (todo.completed === false && this.state.queryCategory === 'false') {
      return true;
    }

    return (this.state.queryCategory === todo.completed);
  });

  render() {
    const { todos, selectedUserId, currentUser } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectUser={this.selectUser}
            setQueryText={this.setQueryText}
            setQueryCategory={this.setQueryCategory}
            textFilter={this.textFilter}
            categoryFilter={this.categoryFilter}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                selectedUser={currentUser}
                clearSelect={this.clearSelect}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
