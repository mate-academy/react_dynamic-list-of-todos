import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './utils';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    value: '',
    status: 'all',
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({ todos });
  }

  chooseByTitle = (event) => {
    this.setState({
      value: event.target.value,
    });
  }

  chooseStatus = (event) => {
    this.setState({
      status: event.target.value,
    });
  }

  selectUser = (userId) => {
    this.setState({
      selectedUserId: userId,
    });
  }

  clearUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  selectUser = selectedUserId => this.setState({ selectedUserId });

  filterTodos = (todos) => {
    const { status, value } = this.state;
    let result = [...todos];

    if (status === 'completed') {
      result = todos.filter(todo => todo.completed);
    }

    if (status === 'in process') {
      result = todos.filter(todo => !todo.completed);
    }

    if (value !== '') {
      result = result.filter(todo => todo.title
        && todo.title.toLowerCase().includes(value.toLowerCase()));
    }

    return result;
  }

  render() {
    const { todos, selectedUserId, status, value } = this.state;
    const { filterTodos, selectUser, chooseStatus, chooseByTitle, clearUser }
    = this;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={filterTodos(todos)}
            onClick={selectUser}
            status={status}
            value={value}
            chooseStatus={chooseStatus}
            chooseTitle={chooseByTitle}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId !== 0 ? (
              <CurrentUser
                selectedUserId={selectedUserId}
                onClick={clearUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
