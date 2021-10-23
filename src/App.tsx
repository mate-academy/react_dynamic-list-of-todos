import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

class App extends React.Component<{}, {}> {
  state = {
    selectedUserId: 0,
    todos: [],
    todosToRender: [],
    filterValue: '',
    selectValue: 'all',
  };

  componentDidMount() {
    getTodos().then(result => this.setState({
      todos: result,
      todosToRender: result,
    }));
  }

  chooseUsers = (userId: number): void => {
    this.setState({
      selectedUserId: userId,
    });
  };

  hideUser = () => {
    this.setState({ selectedUserId: 0 });
  };

  changeFilterValue = async (value: string) => {
    await this.setState({ filterValue: value });
    this.filter();
  };

  changeSelectValue = async (value: string) => {
    await this.setState({ selectValue: value });
    this.filter();
  };

  filter = () => {
    const {
      selectValue, filterValue, todos,
    } = this.state;

    let copy = [...todos];

    if (selectValue === 'active') {
      copy = copy.filter((todo: Todo) => todo.completed === false);
    }

    if (selectValue === 'completed') {
      copy = copy.filter((todo: Todo) => todo.completed === true);
    }

    this.setState(() => {
      return {
        todosToRender: copy.filter((todo: Todo) => {
          return (todo.title).toLowerCase().includes(filterValue.toLowerCase());
        }),
      };
    });
  };

  render() {
    const {
      selectedUserId, filterValue, todosToRender, selectValue,
    } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <input
            type="text"
            value={filterValue}
            onChange={event => this.changeFilterValue(event.target.value)}
          />
          <select
            value={selectValue}
            onChange={event => this.changeSelectValue(event.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>

          </select>
          <TodoList todos={todosToRender} onUser={this.chooseUsers} />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser selectedUserId={selectedUserId} hideUser={this.hideUser} />
            ) : 'No user selected'}

          </div>
        </div>
      </div>
    );
  }
}

export default App;
