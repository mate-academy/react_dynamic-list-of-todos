import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

const getUsers = async() => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const result = await response.json();

  return result;
};

class TodoItem extends React.Component {
  state = {
    users: [],
  }

  async componentDidMount() {
    const usersInfo = await getUsers();

    this.setState({
      users: usersInfo,
    });
  }

  render() {
    const { todo } = this.props;
    const filteredUsers = this.state.users.filter(
      user => user.id === todo.userId
    );
    const Users = filteredUsers.map(
      user => <User key={this.state.users.id} user={user} />
    );

    return (
      <div className={
        `todoBlock ${todo.completed ? 'completed' : 'incompleted'}`}
      >
        <div>
          <b>Task:</b>
          {todo.title}
        </div>
        <b>Responsible:</b>
        {Users}
      </div>
    );
  }
}

TodoItem.propTypes = {
  userId: PropTypes.number,
  todo: PropTypes.object,
  title: PropTypes.string,
}.isRequired;

export default TodoItem;
