import React from 'react';
import './App.scss';
import './styles/general.scss';
import { getTodos } from './components/api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

interface State {
  todos: Todo[];
  selectedUserId: number;
  filterType: string;
}

class App extends React.Component<{}, State> {
  state: State = {
    todos: [],
    selectedUserId: 0,
    filterType: 'all',
  };

  componentDidMount() {
    getTodos()
      .then((todos) => {
        this.setState({ todos });
      });
  }

  setSelectedUserId = (id: number) => {
    this.setState({ selectedUserId: id });
  };

  clearSelectedUserId = () => {
    this.setState({ selectedUserId: 0 });
  };

  handleChangeSelect = (type: string) => {
    this.setState(
      state => ({
        ...state,
        filterType: type,
      }),
    );
  };

  showTodoList = (list: Todo[], type: string) => {
    switch (type) {
      case 'all': return list;

      case 'active':
        return list.filter(todo => !todo.completed);

      case 'completed':
        return list.filter(todo => todo.completed);

      default: return list;
    }
  };

  render() {
    const { selectedUserId, todos, filterType } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          {todos.length === 0 ? 'Loading...'
            : (
              <TodoList
                todos={todos}
                setSelectedId={this.setSelectedUserId}
                filterType={filterType}
                showTodoList={this.showTodoList}
                handleChangeSelect={this.handleChangeSelect}
              />
            )}
        </div>
        {todos.length > 0
         && (
           <div className="App__content">
             <div className="App__content-container">
               {selectedUserId
                 ? (
                   <CurrentUser
                     selectedId={this.state.selectedUserId}
                     clearSelectedId={this.clearSelectedUserId}
                   />
                 )
                 : 'No user selected'}
             </div>
           </div>
         )}
      </div>
    );
  }
}

export default App;
