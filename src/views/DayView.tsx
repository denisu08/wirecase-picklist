import React from "react";

import BasePicklistView, {
  BasePicklistViewProps,
  // PicklistWithHeaderViewProps,
  HeadingValueProps,
  SingleSelectionPicklistViewProps
} from "./BasePicklistView";
import Picklist from "./Picklist";
import Body from "./Body/Body";
import Header from "./Header/Header";

import { findHTMLElement } from "../lib";

export const DAY_CALENDAR_ROW_WIDTH = 7;
export const WEEKS_TO_DISPLAY = 6;

type DayViewProps = BasePicklistViewProps &
  // HeadingValueProps &
  SingleSelectionPicklistViewProps /*&
  PicklistWithHeaderViewProps */;

class DayView extends BasePicklistView<DayViewProps, any> {
  public render() {
    const {
      values,
      // onNextPageBtnClick,
      // onPrevPageBtnClick,
      onValueClick,
      // hasNextPage,
      // hasPrevPage,
      // currentHeadingValue,
      disabledItemIndexes,
      activeItemIndex,
      hoveredItemIndex,
      onCellHover,
      onMount,
      inline,
      markedItemIndexes,
      markedtipIndexes,
      markColor,
      localization,
      ...rest
    } = this.props;

    return (
      <Picklist
        ref={e => (this.picklistNode = findHTMLElement(e))}
        outlineOnFocus={inline}
        {...rest}
      >
        <Header
          width={DAY_CALENDAR_ROW_WIDTH}
          // displayWeeks
          // onNextPageBtnClick={onNextPageBtnClick}
          // onPrevPageBtnClick={onPrevPageBtnClick}
          // hasNextPage={hasNextPage}
          // hasPrevPage={hasPrevPage}
          // title={currentHeadingValue}
          localization={localization}
        />
        <Body
          width={DAY_CALENDAR_ROW_WIDTH}
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

export default DayView;
