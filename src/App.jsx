import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getData } from './api';

class App extends React.Component {
  state = {
    todos: [],
    fullData: [],
    selectedUserId: 0,
    search: '',
    choosedSelect: 'all',
  };

  async componentDidMount() {
    const data = await getData();

    this.setState({ todos: data, fullData: data });
  }

  selectHandler = (id) => (
    this.setState({ selectedUserId: id })
  );

  clearHandler = () => {
    this.setState({ selectedUserId: 0 });
  }

  showBy = () => {
    const { choosedSelect, fullData } = this.state;
    const completedTodo = [...fullData].filter(todo => todo.completed);
    const activeTodo = [...fullData].filter(todo => !todo.completed);

    switch (choosedSelect) {
      case 'active':
        return this.setState({
          todos: completedTodo,
        });

      case 'completed':
        return this.setState({
          todos: activeTodo,
        });

      default:
        return this.setState({
          todos: fullData,
        });
    }
  }

  changeHandler = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });

    this.showBy();
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
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
