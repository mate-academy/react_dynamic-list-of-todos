import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';
import 'semantic-ui-css/semantic.min.css';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    filterText: '',
    showedTodos: 'all',
  };

  componentDidMount() {
    getTodos()
      .then((todos) => {
        this.setState({
          todos,
        });
      })
      // eslint-disable-next-line no-console
      .catch(err => console.warn(err));
  }

  handleСhangeUserId = (userId) => {
    this.setState({
      selectedUserId: userId,
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  resetUserId = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  getFiltredTodos = () => {
    const { todos, filterText, showedTodos } = this.state;

    const filterBy = {
      all: () => true,
      active: completed => !completed,
      completed: completed => completed,
    };

    return todos
      .filter(({ title, completed }) => {
        const todoTitle = title.toLowerCase();
        const searchText = filterText.toLowerCase();

        return todoTitle.includes(searchText)
          && filterBy[showedTodos](completed);
      });
  }

  render() {
    const { selectedUserId, filterText, showedTodos } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={this.getFiltredTodos()}
            selectUserId={this.selectUserId}
            filterText={filterText}
            handleChange={this.handleChange}
            handleСhangeUserId={this.handleСhangeUserId}
            showedTodos={showedTodos}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId
              ? (
                <CurrentUser
                  userId={selectedUserId}
                  resetUserId={this.resetUserId}
                />
              )
              : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
