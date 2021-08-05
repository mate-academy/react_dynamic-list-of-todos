import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { loadTodos } from './utils/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    searchQuery: '',
    filterBy: 'all',
  };

  async componentDidMount() {
    const todos = await loadTodos();

    this.setState({ todos: todos.filter(todo => todo.title !== null) });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { todos, searchQuery, filterBy } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectedUserId={this.state.selectedUserId}
            selectUser={(selectedUserId) => {
              this.setState({
                selectedUserId,
              });
            }}
            query={searchQuery}
            setState={this.handleChange}
            filterBy={filterBy}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {this.state.selectedUserId ? (
              <CurrentUser
                userId={this.state.selectedUserId}
                clearUser={() => {
                  this.setState({
                    selectedUserId: 0,
                  });
                }}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
