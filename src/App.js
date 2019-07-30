import React from 'react';
import './App.css';
import TodoItem from './TodoItem';

const getTodos = async() => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const result = await response.json();

  return result;
};

class App extends React.Component {
  state = {
    todos: [],
    isLoaded: false,
    isLoading: false,
  }

  async componentDidMount() {
    const todosInfo = await getTodos();

    this.setState({
      todos: todosInfo,
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
  }

  render() {
    const { todos, isLoaded, isLoading } = this.state;
    const todoItems = todos.map(
      todo => <TodoItem key={todo.id} todo={todo} />
    );

    return (
      <div className="mainBlock">
        {(isLoaded)
          ? todoItems
          : (
            <button
              type="submit"
              onClick={() => this.handleClick()}
              className="button"
            >
              {(isLoading) ? 'Loading...' : 'Load'}
            </button>
          )
        }
      </div>
    );
  }
}

export default App;
