import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getData } from './api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    search: '',
    choosedSelect: 'all',
  };

  async componentDidMount() {
    const data = await getData();

    this.setState({
      todos: data,
    });
  }

  selectHandler = id => (
    this.setState({ selectedUserId: id })
  );

  clearHandler = () => {
    this.setState({ selectedUserId: 0 });
  }

  changeHandler = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  filterTodos = (items) => {
    const { choosedSelect } = this.state;

    switch (choosedSelect) {
      case 'active':
        return items.filter(item => item.completed);

      case 'completed':
        return items.filter(item => !item.completed);

      default:
        return items;
    }
  }

  render() {
    const { todos, selectedUserId } = this.state;
    const visibleTodos = this.filterTodos(todos);

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={visibleTodos}
            selectHandler={this.selectHandler}
            search={this.state.search}
            changeHandler={this.changeHandler}
            showBy={this.showBy}
            choosedSelect={this.state.choosedSelect}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            <CurrentUser
              userId={selectedUserId}
              clearHandler={this.clearHandler}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
