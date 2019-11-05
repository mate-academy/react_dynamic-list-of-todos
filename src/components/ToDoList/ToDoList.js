import React from 'react';
import ToDoListItem from '../ToDoListItem/ToDoListItem';
import SortingButtons from '../sortingButtons/SortingButtons';

export default function({ todos, sorting, sortType }) {

    let sortedList = [...todos];

    switch(sortType) {
      case 'Sort by title':
        sortedList.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'Sort by username':
        sortedList.sort((a, b) => a.user.name.localeCompare(b.user.name));
        break;
      case 'Sort by status':
        sortedList.sort((a, b) => a.completed - b.completed);
        break;
      default:
        sortedList = [...todos];
        break;
    }

    return (
      <>
        <SortingButtons sorting={sorting} />
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
            {sortedList.map(todo => (
              <ToDoListItem todo={todo} users={todo.user} key={todo.id} />
            ))}
          </tbody>
        </table>
      </>
    );
}
