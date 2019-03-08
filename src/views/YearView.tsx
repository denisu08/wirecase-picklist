import last from 'lodash/last';
import first from 'lodash/first';

import React from 'react';

import BasePicklistView, {
  BasePicklistViewProps,
  PicklistWithHeaderViewProps,
  SingleSelectionPicklistViewProps,
} from './BasePicklistView';
import Picklist from './Picklist';
import Body from './Body/Body';
import Header from './Header/Header';

import { findHTMLElement } from '../lib';

const YEAR_CALENDAR_ROW_WIDTH = 3;

type YearViewProps = BasePicklistViewProps &
  SingleSelectionPicklistViewProps &
  PicklistWithHeaderViewProps;

class YearView extends BasePicklistView<YearViewProps, any> {
  public render() {
    const {
      values,
      onNextPageBtnClick,
      onPrevPageBtnClick,
      onValueClick,
      hasNextPage,
      hasPrevPage,
      onHeaderClick,
      disabledItemIndexes,
      activeItemIndex,
      hoveredItemIndex,
      onCellHover,
      onMount,
      inline,
      localization,
      ...rest
    } = this.props;
    const headerTitle = `${first(values)} - ${last(values)}`;

    return (
      <Picklist
        ref={(e) => (this.picklistNode = findHTMLElement(e))}
        outlineOnFocus={inline}
        {...rest}
      >
        <Header
          title={headerTitle}
          onNextPageBtnClick={onNextPageBtnClick}
          onPrevPageBtnClick={onPrevPageBtnClick}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
          onHeaderClick={onHeaderClick}
          width={YEAR_CALENDAR_ROW_WIDTH}
          displayWeeks={false}
          localization={localization}
        />
        <Body
          width={YEAR_CALENDAR_ROW_WIDTH}
          data={values}
          hovered={hoveredItemIndex}
          onCellHover={onCellHover}
          onCellClick={onValueClick}
          active={activeItemIndex}
          disabled={disabledItemIndexes}
        />
      </Picklist>
    );
  }
}

export default YearView;
