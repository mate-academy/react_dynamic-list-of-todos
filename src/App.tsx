import React from 'react';
import { TodosWithUser } from './interfaces';
import { getPrepearedTodos } from './api/api';
import { TodoList } from './components/TodoList/TodoList';
import './App.css';

interface State {
  isLoading: boolean;
  todoList: TodosWithUser[];
}

class App extends React.Component<{}, State> {
  state = {
    isLoading: false,
    todoList: [],
  };

  getList = async () => {
    this.setState({
      isLoading: true,
    });
    const combinedData = await getPrepearedTodos();
    // console.log(combinedData)

    this.setState({
      isLoading: false,
      todoList: combinedData,
    });
  };

  render() {
    const { isLoading, todoList } = this.state;

    return (
      <>
        {isLoading
          ? <h1>Dynamic list of TODOs</h1>
          : ''}
        <h1>Static list of todos</h1>
        <p>
          <span>Todos: </span>
          {todoList.length}
        </p>
        {todoList.length === 0
          ? (
            <button
              type="button"
              onClick={this.getList}
              disabled={isLoading}
            >
              {isLoading ? 'loading' : 'Load'}
            </button>
          )
          : ''}

        <TodoList todos={todoList} />
      </>
    );
  }
}

export default App;
