import isNil from 'lodash/isNil';
import isArray from 'lodash/isArray';
import invoke from 'lodash/invoke';

import React from 'react';
import { Table } from 'semantic-ui-react';

import { OnValueClickData } from '../BasePicklistView';
// import Cell from './Cell';
// import {
//   cellStyleWidth3,
//   cellStyleWidth4,
//   cellStyleWidth7,
//   CellWidthStyle,
// } from './Cell';

const rowBtnStyle = {
  cursor: 'pointer',
};

const dataDummy = [
  { name: 'Jamie', status: 'Approved', notes: 'Requires call' },
  { name: 'John', status: 'Selected', notes: 'None' },
  { name: 'Jakun', status: 'Approved', notes: 'Requires call' },
  { name: 'Jill', status: 'Approved', notes: 'None' },
];

export type BodyWidth = 3 | 4 | 7;

interface BodyProps {
  /** A number of columns in a row. */
  width: BodyWidth;
  /** Data that is used to fill a picklist. */
  data: string[];
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
  active?: number | number[];
  /** Array of element indexes in `data` array that should be displayed as disabled. */
  disabled?: number[];
}

class Body extends React.Component<BodyProps, any> {
  public render() {
    const {
      data,
      width,
      // onCellClick,
      active,
      // disabled,
      // hovered,
      // onCellHover
    } = this.props;

    // console.log("Data", active, data, width);
    // console.log('Body', buildRows(data, width));

    // const content = buildRows(data, width).map((row, rowIndex) => (
    //   <Table.Row key={`${rowIndex}${row[0]}`}>
    //     {row.map((item, itemIndex) => (
    //       <Cell
    //         style={getCellStyle(width)}
    //         active={isActive(rowIndex, width, itemIndex, active)}
    //         hovered={isHovered(rowIndex, width, itemIndex, hovered)}
    //         disabled={isDisabled(rowIndex, width, itemIndex, disabled)}
    //         marked={isMarked(rowIndex, width, itemIndex, marked)}
    //         markedtip={getMarkedTip(
    //           rowIndex,
    //           width,
    //           itemIndex,
    //           marked,
    //           markedtip,
    //         )}
    //         markColor={markColor}
    //         key={`${rowIndex * width + itemIndex}`}
    //         itemPosition={rowIndex * width + itemIndex}
    //         content={item}
    //         onHover={onCellHover}
    //         onClick={onCellClick}
    //       />
    //     ))}
    //   </Table.Row>
    // ));
    // return <Table.Body>{content}</Table.Body>;

    return (
      <Table.Body>
        {dataDummy.map((item, rowIndex) => (
          <Table.Row
            key={`${rowIndex}`}
            id={`${rowIndex}`}
            style={rowBtnStyle}
            onClick={this.onCellClick}
            onMouseOver={this.onCellHover}
            active={isActive(rowIndex, active)}
          >
            <Table.Cell id='name'>{item.name}</Table.Cell>
            <Table.Cell id='status'>{item.status}</Table.Cell>
            <Table.Cell id='notes'>{item.notes}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    );
  }

  private onCellClick = (event) => {
    // console.log("onCellClick", event);
    // const { content } = this.props;
    const itemPosition = event.currentTarget.id;
    const content = {};
    const { cells } = event.currentTarget;
    for (const cell of cells) {
      content[cell.id] = cell.textContent;
    }
    invoke(this.props, 'onCellClick', event, {
      ...this.props,
      itemPosition,
      value: content,
    });
  }

  private onCellHover = (event) => {
    // console.log("onCellHover", event);

    // const { itemPosition } = this.props;
    const itemPosition = event.currentTarget.id;
    invoke(this.props, 'onCellHover', event, { ...this.props, itemPosition });
  }
}
// function buildRows(data: string[], width: number): string[][] {
//   const height = data.length / width;
//   const rows = [];
//   for (let i = 0; i < height; i++) {
//     rows.push(data.slice(i * width, i * width + width));
//   }

//   return rows;
// }

function isActive(
  rowIndex: number,
  // rowWidth: number,
  // colIndex: number,
  active: number | number[],
): boolean {
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
