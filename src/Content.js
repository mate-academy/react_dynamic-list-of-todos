import React from 'react';

import ListTodos from './ListTodos';

function Content(props) {
  if(props.list.isLoaded && props.list.listUsers === null) {
    return <p>...loading</p>
  } else if (!props.list.isLoaded && props.list.listUsers === null) {
    return <p>not load</p>
  } else if (props.list.isLoaded && props.list.listUsers !== null) {
    return (
      <table>
        <tbody>
          <ListTodos list={props.list} />
        </tbody>
      </table>
    );
  }
}

export default Content;
