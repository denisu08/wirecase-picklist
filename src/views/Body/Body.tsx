import isNil from 'lodash/isNil';
import isArray from 'lodash/isArray';

import React from 'react';
import { Table } from 'semantic-ui-react';

import { OnValueClickData } from '../BasePicklistView';
import Cell from './Cell';
import {
  cellStyleWidth3,
  cellStyleWidth4,
  cellStyleWidth7,
  CellWidthStyle,
} from './Cell';

const rowBtnStyle = {
  cursor: 'pointer',
};

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
    onCellClick,
    active,
    disabled,
    hovered,
    onCellHover,
  } = props;

  console.log('Data', data, width);
  console.log('Body', buildRows(data, width));

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
      <Table.Row style={rowBtnStyle}>
        <Table.Cell>Jamie</Table.Cell>
        <Table.Cell>Approved</Table.Cell>
        <Table.Cell>Requires call</Table.Cell>
      </Table.Row>
      <Table.Row style={rowBtnStyle}>
        <Table.Cell>John</Table.Cell>
        <Table.Cell>Selected</Table.Cell>
        <Table.Cell>None</Table.Cell>
      </Table.Row>
      <Table.Row style={rowBtnStyle}>
        <Table.Cell>Jamie</Table.Cell>
        <Table.Cell>Approved</Table.Cell>
        <Table.Cell>Requires call</Table.Cell>
      </Table.Row>
      <Table.Row style={rowBtnStyle}>
        <Table.Cell>Jill</Table.Cell>
        <Table.Cell>Approved</Table.Cell>
        <Table.Cell>None</Table.Cell>
      </Table.Row>
    </Table.Body >
  );
}

function buildRows(data: string[], width: number): string[][] {
  const height = data.length / width;
  const rows = [];
  for (let i = 0; i < height; i++) {
    rows.push(data.slice(i * width, i * width + width));
  }

  return rows;
}

function isActive(
  rowIndex: number,
  rowWidth: number,
  colIndex: number,
  active: number | number[],
): boolean {
  if (isNil(active)) {
    return false;
  }
  if (isArray(active)) {
    for (const activeIndex of active as number[]) {
      if (rowIndex * rowWidth + colIndex === activeIndex) {
        return true;
      }
    }
  }

  return rowIndex * rowWidth + colIndex === active;
}

export default Body;
