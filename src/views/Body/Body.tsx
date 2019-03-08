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

function Body(props: BodyProps) {
  const {
    data,
    width,
    // onCellClick,
    active,
    // disabled,
    // hovered,
    onCellHover,
  } = props;

  console.log('Data', data, width);
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
      {dataDummy.map((data, rowIndex) => (
        <Table.Row
          key={`${rowIndex}`}
          style={rowBtnStyle}
          onClick={onCellClick}
          onMouseOver={onCellHover}
          active={isActive(rowIndex, active)}
        >
          <Table.Cell>{data.name}</Table.Cell>
          <Table.Cell>{data.status}</Table.Cell>
          <Table.Cell>{data.notes}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  );
}

// function buildRows(data: string[], width: number): string[][] {
//   const height = data.length / width;
//   const rows = [];
//   for (let i = 0; i < height; i++) {
//     rows.push(data.slice(i * width, i * width + width));
//   }

//   return rows;
// }

function onCellClick(event) {
  const { itemPosition, content } = this.props;
  invoke(this.props, 'onClick', event, {
    ...this.props,
    itemPosition,
    value: content,
  });
}

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
