import isNil from 'lodash/isNil';
import isArray from 'lodash/isArray';
import invoke from 'lodash/invoke';

import React from 'react';
import { Table } from 'semantic-ui-react';

import { OnValueClickData } from '../BasePicklistView';

const rowBtnStyle = {
  cursor: 'pointer',
};

interface BodyProps {
  /** Data that is used to fill a picklist. */
  data: any[];
  rawData: any[];
  /** Called after a click on picklist's cell. */
  onCellClick: (
    e: React.SyntheticEvent<HTMLElement>,
    data: OnValueClickData,
  ) => void;
  /** Called on cell hover. */
  onCellHover: (e: React.SyntheticEvent<HTMLElement>, data: any) => void;
  /** Index of an element in `data` array that should be displayed as hovered. */
  hovered?: number;
  /** Index of an element (or array of indexes) in `data` array that should be displayed as active. */
  active?: number;
}

class Body extends React.Component<BodyProps, any> {
  public render() {
    const { data, active } = this.props;
    const rawData = data || [];

    return (
      <Table.Body>
        {rawData.map((item, rowIndex) => (
          <Table.Row
            key={`${rowIndex}`}
            id={`${rowIndex}`}
            style={rowBtnStyle}
            onClick={this.onCellClick}
            onMouseOver={this.onCellHover}
            active={isActive(rowIndex, active)}
          >
            {Object.keys(item).map((key) => (
              <Table.Cell id={key} key={key}>
                {item[key]}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    );
  }

  private onCellClick = (event) => {
    const itemPosition = event.currentTarget.id;
    const { rawData } = this.props;
    const content = rawData[itemPosition];

    invoke(this.props, 'onCellClick', event, {
      ...this.props,
      itemPosition,
      value: content,
    });
  }

  private onCellHover = (event) => {
    const itemPosition = event.currentTarget.id;
    invoke(this.props, 'onCellHover', event, { ...this.props, itemPosition });
  }
}

function isActive(rowIndex: number, active: number | number[]): boolean {
  if (isNil(active)) {
    return false;
  }
  if (isArray(active)) {
    for (const activeIndex of active as number[]) {
      if (rowIndex === activeIndex) {
        return true;
      }
    }
  }

  return rowIndex === active;
}

export default Body;
