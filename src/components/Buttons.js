import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

class Buttons extends Component {
  render() {
    const filters = [{ fil: 'Normal' }, { fil: 'Todos' }, { fil: 'Name' }, { fil: 'Status' }];
    const { changeFilter } = this.props;
    return (
      <div>
        <Button.Group widths="4">
          {filters.map(filter => (
              <Button>{`Sort By ${filter.fil}`}</Button>
          ))}
        </Button.Group>
      </div>
    );
  }
}

export default Buttons;
