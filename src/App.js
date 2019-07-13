import React from 'react';
import './App.css';
import propTypes from 'prop-types';
import { getTodos, getUsers } from './api/api';
import TodoItem from './TodoItem';

class App extends React.Component {
  state = {
    todos: [],
    sortedTodoList: [],
    users: [],
    isLoaded: false,
    isLoading: false,
    tableItemsAmount: 200,
    activePage: 1,
    sortType: 'id',
    sortDirection: 1, // 1 = 'asc', // 2 = desc
  };

  urlParams = (
    `?_limit=${this.state.tableItemsAmount}
    &_page=${this.state.activePage}
    &_sort=${this.state.sortType}
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
        this.setState(
          {
            todos: todosData,
          },
        );
      });
    console.log(this.state);
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

  sortData = (sortItem) => {
    this.setState(state => ({
      sortType: sortItem,
      direction: state.direction === 1 ? -1 : 1,
      sortedTodoList: [...state.todos].sort((a, b) => {
        switch (sortItem) {
          case 'id':
            return state.direction * (b[sortItem] - a[sortItem]);
          case 'completed':
            return state.direction * (b[sortItem] - a[sortItem]);
          case 'title':
            return state.direction * a[sortItem].localeCompare(b[sortItem]);
          case 'userId':
            return state.direction * (b[sortItem] - a[sortItem]);
          default: return 0;
        }
      }),
    }));
  };

  render() {
    const todosWithUser = this.state.sortedTodoList.map(todo => ({
      ...todo,
      user: this.state.users.find(user => user.id === todo.userId),
    }));
    console.log(this.state);
    return (
      <main>
        {this.state.isLoaded ? (
          <div className="App">
            <h1>Static list of todos</h1>
            <table>
              <thead>
                <tr>
                  <td>
                    <button
                      type="button"
                      onClick={() => this.sortData('id')}
                    >
                    Id
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => this.sortData('title')}
                    >
                    Title
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => this.sortData('userId')}
                    >
                    User
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => this.sortData('completed')}
                    >
                    Status
                    </button>
                  </td>
                </tr>
              </thead>
              {
                todosWithUser.map(todo => (
                  <TodoItem todoItem={todo} />
                ))
              }
            </table>
          </div>
        ) : (
          <button
            className="BTN"
            type="submit"
            onClick={this.handleClick}
          >
            {this.state.isLoading ? 'Loading...' : 'Load'}
          </button>
        )}
      </main>
    );
  }
}

propTypes.state = {
  users: propTypes.shape({
    id: propTypes.number,
    name: propTypes.string,
    username: propTypes.string,
    email: propTypes.string,
    address: propTypes.shape({
      street: propTypes.string,
      suite: propTypes.string,
      city: propTypes.string,
    }),
    phone: propTypes.string,
    website: propTypes.string,
    company: propTypes.shape({
      name: propTypes.string,
    }),
  }),
  todos: propTypes.shape({
    userId: propTypes.number,
    id: propTypes.number,
    title: propTypes.string,
    completed: propTypes.boolean,
  }),
};
export default App;
