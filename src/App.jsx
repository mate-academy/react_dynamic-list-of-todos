import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    filterQuery: '',
    selectValue: 'all',
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

  changeUserId = (userId) => {
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
    const { todos, filterQuery, selectValue } = this.state;

    const callbacksForCompletedFilter = {
      all: () => true,
      active: completed => !completed,
      completed: completed => completed,
    };

    return todos
      .filter(({ title, completed }) => {
        const titleInLowerCase = title.toLowerCase();
        const queryInLowerCase = filterQuery.toLowerCase();

        return titleInLowerCase.includes(queryInLowerCase)
          && callbacksForCompletedFilter[selectValue](completed);
      });
  }

  render() {
    const { selectedUserId, filterQuery, selectValue } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={this.getFiltredTodos()}
            selectUserId={this.selectUserId}
            filterQuery={filterQuery}
            handleChange={this.handleChange}
            changeUserId={this.changeUserId}
            selectValue={selectValue}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                resetUserId={this.resetUserId}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
