import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './components/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    selectedTodoId: 0,
    selectFilterValue: 'all',
    filterValue: '',
  };

  componentDidMount() {
    getTodos()
      .then((todos) => {
        this.setState({ todos });
      });
  }

  selectUser = (selectedUserId) => {
    this.setState({ selectedUserId });
  }

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  }

  filterTodosByStatus = (todos) => {
    if (this.state.selectFilterValue === 'completed') {
      return todos.filter(todo => todo.completed === true);
    }

    if (this.state.selectFilterValue === 'active') {
      return todos.filter(todo => todo.completed === false);
    }

    return todos;
  }

  filterTodosByTitle = (todos) => {
    const { filterValue } = this.state;

    if (filterValue === '') {
      return todos;
    }

    return todos.filter((todo) => {
      if (!todo.title) {
        return false;
      }

      return todo.title.includes(filterValue);
    });
  }

  handleFilterQuery = (value) => {
    this.setState({
      filterValue: value,
    });
  }

  handleFilterType = (status) => {
    this.setState({ selectFilterValue: status });
  }

  selectedUser = (userId, todoId) => {
    this.setState({
      selectedUserId: userId,
      selectedTodoId: todoId,
    });
  }

  render() {
    const {
      todos,
      selectedUserId,
      selectedTodoId,
      filterValue,
      selectFilterValue,
    } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={this.filterTodosByTitle(this.filterTodosByStatus(todos))}
            showUser={this.selectedUser}
            selectedTodoId={selectedTodoId}
            filterValue={filterValue}
            selectFilterValue={selectFilterValue}
            handleFilterQuery={this.handleFilterQuery}
            handleFilterType={this.handleFilterType}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clearUser={this.clearUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
