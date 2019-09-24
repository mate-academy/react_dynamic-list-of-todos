import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DataFromServer extends Component {
  state = {
    todos: [],
    users: [],
  }

  getTodosList = () => {
    fetch(this.props.todosUrl)
      .then(response => response.json())
      .then((data) => {
        this.setState({ todos: data });
      });

    fetch(this.props.usersUrl)
      .then(response => response.json())
      .then((data) => {
        this.setState({ users: data });
      });
  }

  render() {
    const { todos, users } = this.state;
    const { getDataFromServer } = this.props;
    if (todos.length === 0 || users.length === 0) {
      return (
        <div>
          <p>no data</p>
          <button type="submit" onClick={this.getTodosList}>Load</button>
        </div>
      );
    }

    return (
      <div>
        <p>Loading complete!</p>
        <p>{`Todos ${todos.length}`}</p>
        <p>{`Todos ${users.length}`}</p>
        <button
          type="submit"
          onClick={() => {
            getDataFromServer(todos, users);
          }}
        >
          continue
        </button>
      </div>
    );
  }
}

DataFromServer.propTypes = {
  todosUrl: PropTypes.string.isRequired,
  usersUrl: PropTypes.string.isRequired,
  getDataFromServer: PropTypes.func.isRequired,
};

export default DataFromServer;
