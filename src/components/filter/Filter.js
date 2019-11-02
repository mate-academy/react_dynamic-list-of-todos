import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

class Filter extends React.Component {

  render() {
  const { activeFilter } = this.props;

  return (
      <Button.Group>
        <Button onClick={() => activeFilter('title')}>Sort by title</Button>
        <Button onClick={() => activeFilter('name')}>Sort by name</Button>
        <Button onClick={() => activeFilter('status')}>Sort by status</Button>
        <Button onClick={() => activeFilter('reset')}>Reset</Button>
      </Button.Group>
    )
  }
}

Filter.propTypes = {
  activeFilter: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Filter;
