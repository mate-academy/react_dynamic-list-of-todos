import React from 'react';
import { getAll } from './api';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    this.loadData();
  }

  checkedChanger = (todo) => {
    const check = !todo.completed;

    this.setState(state => ({
      todos: state.todos.map(
        item => (item.id === todo.id
          ? {
            ...item, completed: check,
          }
          : item
        ),
      ),
    }));
  }

  selectUser = (userId) => {
    this.setState({
      selectedUserId: userId,
    });
  }

  clear = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  async loadData() {
    const newTodos = await getAll().then(todos => todos.data);

    this.setState({
      todos: [...newTodos],
    });
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            checkedChanger={this.checkedChanger}
            selectUser={this.selectUser}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clear={this.clear}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
