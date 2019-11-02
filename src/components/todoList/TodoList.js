import React from 'react';
import Filter from '../filter/Filter';
import TodoTable from '../todoTable/TodoTable';

class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todoList: [],
      typeOfFilter: 'standart',
    }
  }

  componentDidMount() {
    const { todos, users } = this.props;
    this.setState({ todoList:  this.getTodosWithUsers(todos, users)})
  }

  getTodosWithUsers = (todos, users) => {

    return todos.map(todo => {
      const userObj = users.find(user => todo.userId === user.id);
      todo.user = userObj;
      return todo;
    });
  }

  filteredTodoList = () => {
    const { todoList, typeOfFilter } = this.state;
    const sortList = [...todoList];
    if (typeOfFilter === 'status') {
      return sortList.sort((a, b) => b.completed - a.completed);
    } else if (typeOfFilter === 'name') {
      return sortList.sort((a, b) => a.user.name.localeCompare(b.user.name)); 
    } else if (typeOfFilter === 'title') {
      return sortList.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      return sortList;
    }
  }

  activeFilter = (type) => {
    this.setState(prev => {
      return {
        ...prev,
        typeOfFilter: type,
      }
    })
  }

  render() {

    return (
      <>
        <div className="filter">
          <Filter activeFilter={this.activeFilter}/>
        </div>
        <TodoTable todos={this.filteredTodoList()}/>
      </>
    )
  }
}

export default TodoList;
