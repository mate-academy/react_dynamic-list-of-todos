import React from 'react';
import './App.css';
import TodoList from './components/TodoList';

class App extends React.Component {
  state = {
    textButton: 'Load...',
    disabledButton: false,
    renderButton: true,
    sortStatus: 1,
    todos: [],
  }

  updateAppState = (config) => {
    this.setState(config);
  }

  handleClick = () => {
    this.setState({
      disabledButton: true,
      textButton: 'Loading...',
    });

    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then((dataTodos) => {
        fetch('https://jsonplaceholder.typicode.com/users')
          .then(response => response.json())
          .then(dataUsers => (dataTodos.map(todo => (
            {
              ...todo,
              user: dataUsers.find(person => person.id === todo.userId),
            }))))
          .then((todos) => {
            this.setState({
              todos: [...todos],
              renderButton: false,
            });
          });
      });
  }

  render() {
    return (
      <div className="App">
        <h1>Dynamic list of todos</h1>
        {
          (this.state.renderButton)
            ? (
              <button
                disabled={this.state.disabledButton}
                onClick={this.handleClick}
              >
                {this.state.textButton}
              </button>
            )
            : (
              <TodoList
                todos={this.state.todos}
                updateAppState={this.updateAppState.bind(this)}
                sortStatus={this.state.sortStatus}
              />
            )
        }
      </div>
    );
  }
}

export default App;
