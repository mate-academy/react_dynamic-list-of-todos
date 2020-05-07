import React from 'react';
import { ControlPanel } from './interfaces';

interface Props {
  sortedPanelInfo: ControlPanel[];
}

export const SortedPanel: React.FC<Props> = ({ sortedPanelInfo }) => (
  <ul className="list">
    {sortedPanelInfo.map(panel => (
      <li className="item">
        <a
          href={panel.link}
          className="link"
          onClick={panel.clickEvent}
        >
          {panel.name}
        </a>
      </li>
    ))}
  </ul>
);
