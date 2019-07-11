import React from 'react';
import './App.css';
import TodoList from './components/TodoList';
import { getTodosWithUsers } from './components/loadingData';

class App extends React.Component {
  state = {
    renderButton: true,
    todos: [],
  }

  updateAppState = (config) => {
    this.setState(config);
  };

  handleClick = () => {
    const loadButton = document.querySelector('.load-button');
    loadButton.disabled = true;
    loadButton.textContent = 'Loading...';

    getTodosWithUsers(this.updateAppState).then((data) => {
      this.setState({
        todos: data,
        renderButton: false,
      });
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Dynamic list of todos</h1>
        {
          (this.state.renderButton)
            ? (
              <button
                type="button"
                className="load-button"
                onClick={this.handleClick}
              >
                Load
              </button>
            )
            : (
              <TodoList
                todos={this.state.todos}
              />
            )
        }
      </div>
    );
  }
}

export default App;
