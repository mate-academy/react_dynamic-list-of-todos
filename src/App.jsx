import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';

import { Users } from './components/Users/Users';
import './App.scss';

const App = () => (
  <section>
    {/* create separate component for header */}
    <header className="header">
      <nav className="nav">
        <NavLink
          activeClassName="is-active"
          className="nav__link"
          to="/"
          exact
        >
          Home Page
        </NavLink>
        <NavLink
          activeClassName="is-active"
          className="nav__link"
          to="/users"
        >
          Users
        </NavLink>
      </nav>
    </header>
    <Switch>
      <Route path="/" exact>
        <h1>
          Home Page
        </h1>
      </Route>

      <Route path="/users">
        <Users />
      </Route>
    </Switch>
  </section>
);

export default App;
