import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { request } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedId: 0,
    filter: '',
    todosStatus: 'All',
  };

  componentDidMount() {
    request('/todos')
      .then(({ data }) => this.setState({ todos: [...data] }));
  }

  changeHandler = ({ name, value }) => {
    this.setState({ [name]: value });
  }

  setStatus = (status) => {
    this.setState({ todosStatus: status });
  }

  clearUser = () => {
    this.setState({ selectedId: 0 });
  }

  selectUser = (userId) => {
    this.setState((state) => {
      if (state.selectedId === userId) {
        return state;
      }

      return {
        ...state,
        selectedId: userId,
      };
    });
  }

  rendomFilter = () => {
    const { todos } = this.state;

    this.setState({
      todos: [...todos].sort(() => 0.5 - Math.random()),
    });
  }

  prepareTodos = () => {
    const { todos, filter, todosStatus } = this.state;

    let visibleTodos = [...todos];

    if (todosStatus === 'Active') {
      visibleTodos = [...todos].filter(({ completed }) => completed === false);
    }

    if (todosStatus === 'Completed') {
      visibleTodos = [...todos].filter(({ completed }) => completed === true);
    }

    if (filter.trim()) {
      visibleTodos = [...visibleTodos].filter(todo => (
        (`${todo.title}`).toLowerCase().includes(filter.toLowerCase())
      ));
    }

    return visibleTodos;
  }

  render() {
    const { filter, selectedId } = this.state;
    const visibleTodos = this.prepareTodos();

    return (
      <div className="App">
        <div className="App__content">
          <TodoList
            todos={visibleTodos}
            selectedUser={selectedId}
            titleFilter={filter}
            changeHandler={this.changeHandler}
            selectUser={this.selectUser}
            setTodosStatus={this.setStatus}
            rendom={this.rendomFilter}
          />
        </div>

        <div className="App__sidebar">
          <div className="App__content-container">
            {selectedId ? (
              <CurrentUser
                userId={selectedId}
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
