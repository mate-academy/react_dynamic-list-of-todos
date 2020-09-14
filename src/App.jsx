import React from 'react';
import './App.scss';
import './styles/general.scss';
import { getAll } from './api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

class App extends React.Component {
  state = {
    todosFromServer: [],
    todos: [],
    selectedUserId: 0,
    selectedFilter: 'All',
  };

  componentDidMount = async() => {
    const getTodos = await getAll();

    this.setState({
      todosFromServer: getTodos.data
        .filter(item => item.title && item.id && item.userId),

      todos: getTodos.data.filter(item => item.title && item.id && item.userId),
    });
  }

  handleSelect = (event) => {
    if (event === 'Completed') {
      this.setState(prevState => ({
        todos: prevState.todosFromServer.filter(item => item.completed),
      }));
    } else if (event === 'Not completed') {
      this.setState(prevState => ({
        todos: prevState.todosFromServer.filter(item => !item.completed),
      }));
    } else {
      this.setState(prevState => ({
        todos: prevState.todosFromServer,
      }));
    }
  }

  render() {
    const { todos, selectedUserId, selectedFilter } = this.state;

    return (
      <div className="App">
        {console.log(this.state.todos)}
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            handleSelect={this.handleSelect}
            selectedFilter={selectedFilter}
          />
        </div>
        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser userId={selectedUserId} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
