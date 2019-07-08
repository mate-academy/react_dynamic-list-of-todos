import React from 'react';
import PropTypes from 'prop-types';

import TodoItem from '../TodoItem/TodoItem';
import Filter from '../Filters/Filters';
import User from '../User/User';

import './TodoList.css';

class TodoList extends React.Component {
  state = {
    filterField: 'user',
    filterSubfield: 'name',
    direction: 1,
    showUserInfo: false,
    chosenUser: {},
  };

  setUserInfo = (user) => {
    if (user) {
      this.setState({
        chosenUser: user,
        showUserInfo: true,
      });
    } else {
      this.setState({ showUserInfo: false });
    }
  };

  changeFilterField = (value, subvalue) => {
    const { filterField, filterSubfield } = this.state;
    // eslint-disable-next-line max-len,react/no-access-state-in-setstate
    const direction = (filterField === value && filterSubfield === subvalue) ? this.state.direction * -1 : 1;

    this.setState({
      filterField: value,
      filterSubfield: subvalue,
      direction,
    });
  };

  filter(field, subfield) {
    const list = this.props.todosList;
    return list.sort((x, y) => {
      if (typeof subfield === 'string') {
        // eslint-disable-next-line max-len
        return String(x[field][subfield]).localeCompare((String(y[field][subfield]))) * this.state.direction;
      }
      return x[field][subfield] - y[field][subfield] * this.state.direction;
    });
  }

  showList() {
    const list = this.filter(this.state.filterField, this.state.filterSubfield);
    // eslint-disable-next-line max-len
    const listOfTodos = [];
    list.forEach((item) => {
      // eslint-disable-next-line max-len
      listOfTodos.push(<TodoItem setUserInfo={this.setUserInfo} key={item.id} todo={item} />);
    });

    return listOfTodos;
  }

  render() {
    const { showUserInfo, chosenUser } = this.state;
    return (
      <div className="todo-wrapper">
        <table className="todo-list">
          <Filter changeFilterField={this.changeFilterField} />
          {
            this.showList()
          }
        </table>
        {
          // eslint-disable-next-line max-len
          showUserInfo && <User setUserInfo={this.setUserInfo} user={chosenUser} />
        }
      </div>
    );
  }
}

TodoList.propTypes = {
  todosList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;
