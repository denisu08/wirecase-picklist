import isNil from 'lodash/isNil';
import isArray from 'lodash/isArray';
import invoke from 'lodash/invoke';
import pickBy from 'lodash/pickBy';

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
  columns: any[];
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
  noRecordText?: string;
}

class Body extends React.Component<BodyProps, any> {
  public render() {
    const { data, active, columns, noRecordText = 'No Record' } = this.props;
    const rawData = data || [];

    if (rawData && rawData.length && columns && columns.length) {
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
              {columns.map((column) => (
                <Table.Cell id={column.model} key={column.model}>
                  {item[column.model]}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      );
    } else {
      return <Table.Footer fullWidth>
      <Table.Row>
        <Table.HeaderCell colSpan='999'>
          {noRecordText}
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>;
    }
  }

  private onCellClick = (event) => {
    const itemPosition = event.currentTarget.id;
    const { data } = this.props;

    let content;
    if (data && data.length) {
      content = data[itemPosition];
    } else {
      content = data[itemPosition];
    }

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
