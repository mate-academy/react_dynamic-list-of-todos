import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getAll } from './api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    getAll()
      .then((response) => {
        const result = response.data.filter(item => (
          item.title !== null
        ));

        this.setState({
          todos: result,
        });
      });
  }

  handleChangeCheked = (userId) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((item) => {
        if (item.id !== userId) {
          return item;
        }

        return {
          ...item,
          completed: !item.completed,
        };
      }),
    }));
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            changeCheked={this.handleChangeCheked}
            selectedUserId={(userId) => {
              this.setState({ selectedUserId: userId });
            }}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">

            {selectedUserId !== 0 ? (
              <CurrentUser
                userId={selectedUserId}
                reset={() => {
                  this.setState({ selectedUserId: 0 });
                }}
              />
            ) : (
              <p>Please select user</p>
            )}

          </div>
        </div>
      </div>
    );
  }
}

export default App;
