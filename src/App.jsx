import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

const URL = 'https://mate-api.herokuapp.com';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    user: '',
  };

  componentDidMount() {
    this.allData();
  }

  getTodos = async() => {
    const response = await fetch(`${URL}/todos`);
    const result = await response.json();

    return result.data;
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  selectToggle = (event) => {
    const { value } = event.target;
    let select;

    if (value === 'true') {
      select = true;
    }

    if (value === 'false') {
      select = false;
    }

    if (value === 'all') {
      select = value;
    }

    this.getTodos().then(todos => this.setState({
      todos:
        todos.filter(todo => (select === 'all'
          ? todo.title !== null
          : todo.completed === select && todo.title !== null)),
    }));
  }

  selectedUser = (id) => {
    this.setState({ selectedUserId: id });
  }

  clearUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  randomTodos = () => {
    const { todos } = this.state;

    this.setState(state => ({
      todos: [...todos].sort(() => Math.random() - 0.5),
    }));
  };

  allData() {
    this.getTodos().then(todos => this.setState({
      todos:
        todos.filter(todo => todo.title !== null),
    }));
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectedUser={this.selectedUser}
            user={this.state.user}
            handleChange={this.handleChange}
            randomTodos={this.randomTodos}
            selectToggle={this.selectToggle}
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
