import React from 'react';
import './App.css';
import propTypes from './propTypes';
import { getTodos, getUsers } from './api/api';
import TodoItem from './TodoItem';

class App extends React.Component {
  state = {
    todos: [],
    sortedTodoList: [],
    users: [],
    isLoaded: false,
    isLoading: false,
    sortType: 'id',
    sortDirection: 1, // 1 = 'asc', // 2 = desc
  };

  urlParams = (
    `?_sort=${this.state.sortType}
    &_order=${this.state.sortDirection === 1 ? 'asc' : 'desc'}`);

  async componentDidMount() {
    await getUsers()
      .then((userData) => {
        this.setState(
          { users: userData },
        );
      });
    await getTodos(this.urlParams)
      .then((todosData) => {
        this.setState(previousState => (
          {
            todos: todosData.map(todo => ({
              ...todo,
              user: previousState.users.find(user => user.id === todo.userId),
            })),
          }
        ));
      });
  }

  handleClick = () => {
    this.setState({
      isLoading: true,
    });
    setTimeout(() => {
      this.sortData(this.state.sortType);
      this.setState({
        isLoaded: true,
        isLoading: false,
      });
    }, 2000);
  };

  sortData = (sortCase) => {
    this.setState(state => ({
      sortType: sortCase,
      direction: state.direction === 1 ? -1 : 1,
      sortedTodoList: [...state.todos].sort((a, b) => {
        if (sortCase === 'title') {
          return state.direction * a[sortCase].localeCompare(b[sortCase]);
        }
        return state.direction * (b[sortCase] - a[sortCase]);
      }),
    }));
  };

  render() {
    const todosWithUser = this.state.sortedTodoList;
    return (
      <main>
        {this.state.isLoaded ? (
          <div className="App">
            <h1>Static list of todos</h1>
            <table className="table">
              <thead>
                <tr>
                  <th
                    className="tableCell table__header-btn"
                    onClick={() => this.sortData('id')}
                  >
                    Id
                  </th>
                  <th
                    className="tableCell table__header-btn"
                    onClick={() => this.sortData('title')}
                  >
                    Title
                  </th>
                  <th
                    className="tableCell table__header-btn"
                    onClick={() => this.sortData('userId')}
                  >
                    User
                  </th>
                  <th
                    className="tableCell table__header-btn"
                    onClick={() => this.sortData('completed')}
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  todosWithUser.map(todo => (
                    <TodoItem todoItem={todo} />
                  ))
                }
              </tbody>
            </table>
          </div>
        ) : (
          <button
            className="btn"
            type="submit"
            disabled={this.state.isLoading}
            onClick={this.handleClick}
          >
            {this.state.isLoading ? 'Loading...' : 'Load'}
          </button>
        )}
      </main>
    );
  }
}
propTypes.state = propTypes;

export default App;
