import React from 'react';
import './App.css';
import TodoList from '../TodoList/TodoList';
import Loading from '../Loading/Loading';
import loadData from '../../api/loadData';

import { usersLink, todosLink } from '../../api/apiLinks';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todosList: [],
      isLoaded: false,
      showLoading: false,
    };
  }

  // Load data on button click and show TodoList
  handleClickAndLoadTodo = async() => {
    this.setState({ showLoading: true });
    await this.prepareData();
    this.setState({
      showLoading: false,
      isLoaded: true,
    });
  };

  // Connect user with his todos and return array of objects
  async prepareData() {
    // eslint-disable-next-line max-len
    const todos = await loadData(todosLink);
    // eslint-disable-next-line max-len
    const users = await loadData(usersLink);

    const preparedTodos = todos.map(todo => ({
      todo,
      user: users.find(user => todo.userId === user.id),
    }));

    this.setState({ todosList: preparedTodos });
  }

  render() {
    const { isLoaded, showLoading, todosList } = this.state;
    return (
      <main className="main">
        {
          showLoading && <Loading />
        }
        {
          // eslint-disable-next-line max-len,react/button-has-type
          !isLoaded && (
            <button className="load-btn" onClick={this.handleClickAndLoadTodo}>
              Load
            </button>
          )
        }
        {
          // eslint-disable-next-line max-len
          isLoaded && <TodoList todosList={todosList} />
        }
      </main>
    );
  }
}

export default App;
