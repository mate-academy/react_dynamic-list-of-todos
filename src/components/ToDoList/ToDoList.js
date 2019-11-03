import React, { Component } from 'react';
import ToDoListItem from '../ToDoListItem/ToDoListItem';

export default class ToDoList extends Component {

  render() {
    const { users, todos, sorting, sortType } = this.props;

    const defaultList = todos.map((todo) => {
      return {
        ...todo,
        user: users.find(user => user.id === todo.userId),
      };
    });

    let sortedList = [...defaultList];
    if (sortType === 'Sort by title') {
      sortedList.sort((a, b) => a.title > b.title ? 1 : -1);
    } else if (sortType === 'Sort by username') {
      sortedList.sort((a, b) => a.user.name > b.user.name ? 1 : -1);
    } else if (sortType === 'Sort by status') {
      sortedList.sort((a, b) => a.completed - b.completed);
    } else {
      sortedList = [...defaultList];
    }

    return (
      <>
        <div className="btn-group col-sm-8 px-0 mx-auto" role="group" aria-label="Basic example">
          <button
          type="button"
          className="btn btn-secondary" onClick={sorting}>Sort by title</button>
          <button type="button"
          className="btn btn-secondary" onClick={sorting}>Sort by username</button>
          <button type="button"
          className="btn btn-secondary" onClick={sorting}>Sort by status</button>
          <button type="button"
          className="btn btn-secondary" onClick={sorting}>Show default list</button>
        </div>
        <table className="table table-bordered table-dark col-sm-8 m-auto">
          <thead>
            <tr>
              <th scope="col">ToDo Item</th>
              <th scope="col">User</th>
              <th scope="col">User Email</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedList.map(todo => <ToDoListItem
                                      todo={todo}
                                      users={todo.user}
                                      key={todo.id}
                                    />)}
          </tbody>
        </table>
      </>
    );
  }
}
