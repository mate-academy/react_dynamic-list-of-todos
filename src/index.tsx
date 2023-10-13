import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { AppContext } from './Contexts/Context';

// on build i have error that React isn't used, so i created elem.
React.createElement('div');

ReactDOM.render(
  <AppContext>
    <App />
  </AppContext>,
  document.getElementById('root'),
);
