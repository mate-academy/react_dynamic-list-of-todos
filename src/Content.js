import React from 'react';

import ListTodos from './ListTodos';

function Content(props) {
  if(props.state.isLoaded && props.state.listUsers === null) {
    return <p>...loading</p>
  } else if (!props.state.isLoaded && props.state.listUsers === null) {
    return <p>not load</p>
  } else if (props.state.isLoaded && props.state.listUsers !== null) {
    return <table><tbody><ListTodos list={props.state} /></tbody></table>
  }
}

export default Content;
