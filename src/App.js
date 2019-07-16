import React from 'react';
import './App.css';
import TodoList from './components/TodoList';
import { getTodosWithUsers } from './components/loadingData';

class App extends React.Component {
  state = {
    isLoadButtonVisible: true,
    todos: [],
    textOfLoadButton: 'Load',
  }

  updateAppState = (config) => {
    this.setState(config);
  };

  handleClick = () => {
    this.setState({
      textOfLoadButton: 'Loading...',
    });

    getTodosWithUsers(this.updateAppState).then((data) => {
      this.setState({
        todos: data,
        isLoadButtonVisible: false,
      });
    });
  };

  render() {
    const { textOfLoadButton, isLoadButtonVisible, todos } = this.state;

    return (
      <div className="App">
        <h1>Dynamic list of todos</h1>
        {
          (isLoadButtonVisible)
            ? (
              <button
                type="button"
                className="load-button"
                disabled={textOfLoadButton === 'Loading...'}
                onClick={this.handleClick}
              >
                {textOfLoadButton}
              </button>
            )
            : (
              <TodoList
                todos={todos}
              />
            )
        }
      </div>
    );
  }
}

export default App;
