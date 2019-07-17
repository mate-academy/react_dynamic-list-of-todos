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

  urlParams =
    `?_sort=${this.state.sortType}
    &_order=${this.state.sortDirection === 1 ? 'asc' : 'desc'}`;

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

  handleClick = () => {
    this.setState({
      isLoading: true,
    });

    this.loadData()
      .then(() => {
        this.sortData(this.state.sortType);
        this.setState({
          isLoaded: true,
          isLoading: false,
        });
      });
  };

  async loadData() {
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

  render() {
    const todosWithUser = this.state.sortedTodoList;
    return (
      <main>
        {this.state.isLoaded ? (
          <div className="App">
            <h1>Dynamic list of todos</h1>
            <table className="table" key="table">
              <thead key="table_head">
                <tr key="thead_row">
                  <th
                    key="thead_row--id"
                    className="tableCell table__header-btn"
                    onClick={() => this.sortData('id')}
                  >
                    Id
                  </th>
                  <th
                    key="thead_row--title"
                    className="tableCell table__header-btn"
                    onClick={() => this.sortData('title')}
                  >
                    Title
                  </th>
                  <th
                    key="thead_row--userId"
                    className="tableCell table__header-btn"
                    onClick={() => this.sortData('userId')}
                  >
                    User
                  </th>
                  <th
                    key="thead_row--completed"
                    className="tableCell table__header-btn"
                    onClick={() => this.sortData('completed')}
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody key="table_body">
                {
                  todosWithUser.map(todo => (
                    <TodoItem key={`todo-${todo.id}`} todoItem={todo} />
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
