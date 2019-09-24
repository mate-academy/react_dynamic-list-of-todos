import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DataFromServer extends Component {
  state = {
    todos: [],
    users: [],
    loadingText: 'You must load Data',
  }

  getTodosList = () => {
    this.setState({
      loadingText: 'loading...',
    });

    fetch(this.props.todosUrl)
      .then(response => response.json())
      .then((data) => {
        this.setState({
          todos: data,
          loadingText: 'Loading Complete',
        });
      })
      .catch(() => {
        this.setState({
          loadingText: 'Sorry, try again',
        });
      });

    fetch(this.props.usersUrl)
      .then(response => response.json())
      .then((data) => {
        this.setState({ users: data });
      });
  }

  render() {
    const { todos, users, loadingText } = this.state;
    const { getDataFromServer } = this.props;
    if (todos.length === 0 || users.length === 0) {
      return (
        <div>
          <p>{loadingText}</p>
          <button type="submit" onClick={this.getTodosList}>Load Data</button>
        </div>
      );
    }

    return (
      <div>
        <p>{loadingText}</p>
        <p>{`Todos ${todos.length}`}</p>
        <p>{`Todos ${users.length}`}</p>
        <button
          type="submit"
          onClick={() => {
            getDataFromServer(todos, users);
          }}
        >
          Сontinue
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
