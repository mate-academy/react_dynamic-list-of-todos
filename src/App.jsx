import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getAll } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    selectedTodoId: 0,
    filterInputValue: '',
    selectValue: 'all',
  };

  componentDidMount() {
    getAll()
      .then((todos) => {
        this.setState({ todos: todos.data });
      });
  }

  selectedUserId = (userId, todoId) => {
    this.setState({
      selectedUserId: userId,
      selectedTodoId: todoId,
    });
  }

  clearUser = () => {
    this.setState({
      selectedUserId: 0,
      selectedTodoId: 0,
    });
  }

  filterTodosByTitle = (todos) => {
    if (this.state.filterInputValue === '') {
      return todos;
    }

    return todos.filter((todo) => {
      if (!todo.title) {
        return false;
      }

      return todo.title.includes(this.state.filterInputValue);
    });
  }

  onFilterInputChange = (text) => {
    this.setState({
      filterInputValue: text,
    });
  }

  onSelectValueChange = (status) => {
    this.setState({
      selectValue: status,
    });
  }

  filterTodosByStatus = (todos) => {
    if (this.state.selectValue === 'completed') {
      return todos.filter(todo => todo.completed === true);
    }

    if (this.state.selectValue === 'notCompleted') {
      return todos.filter(todo => todo.completed === false);
    }

    return todos;
  }

  render() {
    const { todos,
      selectedUserId,
      selectedTodoId,
      filterInputValue,
      selectValue } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={this.filterTodosByTitle(this.filterTodosByStatus(todos))}
            selectedTodoId={selectedTodoId}
            filterInputValue={filterInputValue}
            onClick={this.selectedUserId}
            onFilterInputChange={this.onFilterInputChange}
            selectValue={selectValue}
            onSelectValueChange={this.onSelectValueChange}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                onClick={this.clearUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
