import React from 'react';

import BasePicklistView, {
  BasePicklistViewProps,
  PicklistWithOptionalHeaderViewProps,
  SingleSelectionPicklistViewProps,
} from './BasePicklistView';
import Picklist from './Picklist';
import Body from './Body/Body';
import Header, { HeaderProps } from './Header/Header';

import { findHTMLElement } from '../lib';

export const MONTH_CALENDAR_ROW_WIDTH = 3;

type MonthViewProps = BasePicklistViewProps &
  SingleSelectionPicklistViewProps &
  PicklistWithOptionalHeaderViewProps;

class MonthView extends BasePicklistView<MonthViewProps, any> {
  public render() {
    const {
      values,
      hasHeader,
      onValueClick,
      onNextPageBtnClick,
      onPrevPageBtnClick,
      hasPrevPage,
      hasNextPage,
      onHeaderClick,
      disabledItemIndexes,
      activeItemIndex,
      currentHeadingValue,
      onCellHover,
      hoveredItemIndex,
      onMount,
      inline,
      localization,
      ...rest
    } = this.props;
    const headerProps: HeaderProps = {
      onNextPageBtnClick,
      onPrevPageBtnClick,
      hasPrevPage,
      hasNextPage,
      onHeaderClick,
      title: currentHeadingValue,
      displayWeeks: false,
      width: MONTH_CALENDAR_ROW_WIDTH,
      localization,
    };

    return (
      <Picklist
        ref={(e) => (this.picklistNode = findHTMLElement(e))}
        outlineOnFocus={inline}
        {...rest}
      >
        {hasHeader && <Header {...headerProps} />}
        <Body
          width={MONTH_CALENDAR_ROW_WIDTH}
          data={values}
          onCellClick={onValueClick}
          onCellHover={onCellHover}
          active={activeItemIndex}
          hovered={hoveredItemIndex}
          disabled={disabledItemIndexes}
        />
      </Picklist>
    );
  }
}

export default MonthView;
