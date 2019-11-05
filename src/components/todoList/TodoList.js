import React from 'react';
import Filter from '../filter/Filter';
import TodoTable from '../todoTable/TodoTable';

class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      typeOfFilter: 'standart',
    }
  }

  filteredTodoList = () => {
    const { typeOfFilter } = this.state;
    const { todoList } = this.props; 
    const sortList = [...todoList];

    switch(typeOfFilter) {
      case 'status':
        return sortList.sort((a, b) => b.completed - a.completed);
      case 'name':
        return sortList.sort((a, b) => a.user.name.localeCompare(b.user.name));
      case 'title':
        return sortList.sort((a, b) => a.title.localeCompare(b.title));
      default:
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
