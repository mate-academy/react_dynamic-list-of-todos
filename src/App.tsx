/* eslint-disable react/no-unused-state */
/* eslint-disable no-console */
import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './Api';

type Props = {};

type State = {
  selectedUserId: number;
  todos: Todo[],
  randomize: boolean,
};

class App extends React.Component<Props, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
    randomize: false,
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({ todos: [...todos] });
  }

  enableRandom = () => {
    const shuffleTodos = () => {
      const newTodos = [...this.state.todos];

      // eslint-disable-next-line no-plusplus
      for (let i = newTodos.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = newTodos[i];

        newTodos[i] = newTodos[j];
        newTodos[j] = temp;
      }

      return newTodos;
    };

    this.setState({
      randomize: true,
      todos: shuffleTodos(),
    });
  };

  selectUserId = (id: number) => {
    this.setState({ selectedUserId: id });
  };

  render() {
    const { selectedUserId, todos } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectUserId={this.selectUserId}
            enableRandom={this.enableRandom}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser userId={selectedUserId} selectUserId={this.selectUserId} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
