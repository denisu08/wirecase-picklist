import React from 'react';

import BasePicklistView, {
  BasePicklistViewProps,
  PicklistWithHeaderViewProps,
  HeadingValueProps,
  SingleSelectionPicklistViewProps,
} from './BasePicklistView';
import Picklist from './Picklist';
import Body from './Body/Body';
import Header from './Header/Header';

import { findHTMLElement } from '../lib';

// export const PICKLIST_ROW_WIDTH = 7;

type PicklistViewProps = BasePicklistViewProps &
  HeadingValueProps &
  SingleSelectionPicklistViewProps &
  PicklistWithHeaderViewProps;

class PicklistView extends BasePicklistView<PicklistViewProps, any> {
  public render() {
    const {
      values,
      rawData,
      onValueClick,
      activeItemIndex,
      hoveredItemIndex,
      onCellHover,
      onMount,
      inline,
      onNextPageBtnClick,
      onPrevPageBtnClick,
      handlepagechange,
      filterchange,
      hasNextPage,
      hasPrevPage,
      columns,
      activePage,
      pageSize,
      ...rest
    } = this.props;

    return (
      <Picklist
        ref={(e) => (this.picklistNode = findHTMLElement(e))}
        outlineOnFocus={inline}
        activePage={activePage}
        pageSize={pageSize}
        handlepagechange={handlepagechange}
        filterchange={filterchange}
        {...rest}
      >
        <Header
          // width={PICKLIST_ROW_WIDTH}
          onNextPageBtnClick={onNextPageBtnClick}
          onPrevPageBtnClick={onPrevPageBtnClick}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
          columns={columns}
        />
        <Body
          // width={PICKLIST_ROW_WIDTH}
          data={values}
          rawData={rawData}
          hovered={hoveredItemIndex}
          onCellHover={onCellHover}
          onCellClick={onValueClick}
          active={activeItemIndex}
        />
      </Picklist>
    );
  }
}

export default PicklistView;