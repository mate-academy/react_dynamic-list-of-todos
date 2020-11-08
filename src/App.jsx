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
    searchValue: '',
    select: 'All',
  };

  componentDidMount() {
    getTodos()
      .then((result) => {
        this.setState({
          todos: result.filter(todo => todo.title),
        });
      });
  }

  todoOnClick = (userId) => {
    this.setState({
      selectedUserId: userId,
    });
  }

  clearOnClick = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  handleChange =(event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  selected = (todosList) => {
    switch (this.state.select) {
      case 'Active':
        return todosList.filter(todo => !todo.completed);
      case 'Completed':
        return todosList.filter(todo => todo.completed);
      default:
        return todosList;
    }
  }

  render() {
    const {
      todos,
      selectedUserId,
      searchValue,
      select,
    } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={this.selected(todos)}
            userSelect={this.todoOnClick}
            searchValue={searchValue}
            handleChange={this.handleChange}
            select={select}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clearOnClick={this.clearOnClick}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
