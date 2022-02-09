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

  changeFilterValue = (value: string) => {
    this.setState({ filterValue: value });
    this.filter();
  };

  changeSelectValue = (value: string) => {
    this.setState({ selectValue: value });
    this.filter();
  };

  filter = () => {
    const {
      selectValue, filterValue,
    } = this.state;
    let { todos } = this.state;


    if (selectValue === 'active') {
      todos = todos.filter((todo: Todo) => todo.completed === false);
    }

    if (selectValue === 'completed') {
      todos = todos.filter((todo: Todo) => todo.completed === true);
    }

    this.setState(() => {
      return {
        todosToRender: todos.filter((todo: Todo) => {
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
          <TodoList
            todos={todosToRender}
            onUser={this.chooseUsers}
            filterValue={filterValue}
            selectValue={selectValue}
            changeFilterValue={this.changeFilterValue}
            changeSelectValue={this.changeSelectValue}
          />
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
