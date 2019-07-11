import React from 'react';
import './App.css';

import getData from './api/getData';
import getSortedList from './Components/getSortedList';
import TodoList from './Components/TodoList';

class App extends React.Component {
  state = {
    todos: [],
    visibleTodos: [],
    isLoaded: false,
    isLoading: false,
    sortField: 'id',
  };

  async componentDidMount() {
    const todos = await getData();

    this.setState({
      todos,
      visibleTodos: [...todos],
    });
  }

  handleClick = () => {
    this.setState({
      isLoading: true,
    });

    setTimeout(() => {
      this.setState({
        isLoaded: true,
        isLoading: false,
      });
    }, 2000);
  };

  sortBy = (sortField) => {
    this.setState({
      sortField,
    });
    this.setState(prevState => ({
      visibleTodos: getSortedList(prevState),
    }));
  };

  render() {
    const {
      visibleTodos,
      isLoaded,
      isLoading,
    } = this.state;

    return (
      <div className="App">
        { isLoaded ? (
          <>
            <h1 className="main-title">Dynamic list of todos</h1>

            <div className="sort-buttons">
              <h2>
                Sort by:
              </h2>
              <button
                type="button"
                onClick={() => this.sortBy('id')}
                className="sort-buttons__btn"
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => this.sortBy('title')}
                className="sort-buttons__btn"
              >
                Task
              </button>
              <button
                type="button"
                onClick={() => this.sortBy('user')}
                className="sort-buttons__btn"
              >
                User
              </button>
            </div>

            <TodoList todos={visibleTodos} />
          </>
        ) : (
          <button type="button" onClick={this.handleClick} className="load-btn">
            {isLoading ? 'Loading...' : 'Load' }
          </button>
        )}
      </div>
    );
  }
}

export default App;
