import filter from "lodash/filter";
import range from "lodash/range";
import includes from "lodash/includes";
import isArray from "lodash/isArray";
import some from "lodash/some";

import React from "react";

import DayView from "../../views/DayView";
import { WEEKS_TO_DISPLAY } from "../../views/DayView";
import {
  BasePickerOnChangeData,
  BasePickerProps,
  // DisableValuesProps,
  // EnableValuesProps,
  // MinMaxValueProps,
  // MarkedValuesProps,
  ProvideHeadingValue,
  SingleSelectionPicker
} from "../BasePicker";
// import {
//   buildDays,
//   getDisabledDays,
//   getMarkedDays,
//   getMarkedTips,
//   getInitialDatePosition,
//   isNextPageAvailable,
//   isPrevPageAvailable
// } from "./sharedFunctions";

const PAGE_WIDTH = 7;
export const DAYS_ON_PAGE = WEEKS_TO_DISPLAY * PAGE_WIDTH;

export interface DayPickerOnChangeData extends BasePickerOnChangeData {
  value: {
    data: string;
  };
}

type DayPickerProps = BasePickerProps;

class DayPicker extends SingleSelectionPicker<
  DayPickerProps
> /* implements ProvideHeadingValue */ {
  constructor(props) {
    super(props);
    this.PAGE_WIDTH = PAGE_WIDTH;
  }

  public render() {
    const {
      onChange,
      value,
      initializeWith,
      closePopup,
      inline,
      isPickerInFocus,
      isTriggerInFocus,
      onPicklistViewMount,
      // disable,
      // enable,
      // minDate,
      // maxDate,
      // marked,
      // markedtip,
      // markColor,
      localization,
      ...rest
    } = this.props;

    return (
      <DayView
        {...rest}
        values={this.buildPicklistValues()}
        // hasNextPage={this.isNextPageAvailable()}
        // hasPrevPage={this.isPrevPageAvailable()}
        // onNextPageBtnClick={this.switchToNextPage}
        // onPrevPageBtnClick={this.switchToPrevPage}
        onValueClick={this.handleChange}
        onBlur={this.handleBlur}
        inline={this.props.inline}
        onMount={this.props.onPicklistViewMount}
        hoveredItemIndex={this.state.hoveredCellPosition}
        onCellHover={this.onHoveredCellPositionChange}
        // currentHeadingValue={this.getCurrentDate()}
        // disabledItemIndexes={this.getDisabledPositions()}
        // activeItemIndex={this.getActiveCellPosition()}
        // markedItemIndexes={this.getMarkedPositions()}
        // markedtipIndexes={this.getMarkedTipsPositions()}
        // markColor={markColor}
        localization={localization}
      />
    );
  }

  // public getCurrentDate(): string {
  //   /* Return currently selected year and month(string) to display in picklist header. */
  //   return this.state.date.format("MMMM YYYY");
  // }

  protected buildPicklistValues(): string[] {
    /*
      Return array of dates (strings) like ['31', '1', ...]
      that used to populate picklist's page.
    */
    // return buildDays(this.state.date, DAYS_ON_PAGE);
    return [];
  }

  // protected getSelectableCellPositions(): number[] {
  //   return filter(
  //     range(0, DAYS_ON_PAGE),
  //     d => !includes(this.getDisabledPositions(), d)
  //   );
  // }

  // protected getInitialDatePosition(): number {
  //   return getInitialDatePosition(
  //     this.state.date.date().toString(),
  //     this.buildPicklistValues()
  // this.getSelectableCellPositions()
  //   );
  // }

  // protected getActiveCellPosition(): number {
  //   /*
  //     Return position of a date that should be displayed as active
  //     (position in array returned by `this.buildPicklistValues`).
  //   */
  //   if (this.props.value && this.props.value === this.state.data) {
  //     const disabledPositions = this.getDisabledPositions();
  //     const active = this.buildPicklistValues()
  //       .map((day, i) => (includes(disabledPositions, i) ? undefined : day))
  //       .indexOf(this.props.value);
  //     if (active >= 0) {
  //       return active;
  //     }
  //   }
  // }

  // protected getDisabledPositions(): number[] {
  //   /*
  //     Return position numbers of dates that should be displayed as disabled
  //     (position in array returned by `this.buildPicklistValues`).
  //   */
  //   // const { disable, maxDate, minDate, enable } = this.props;

  //   return getDisabledDays(
  //     disable,
  //     maxDate,
  //     minDate,
  //     this.state.date,
  //     DAYS_ON_PAGE,
  //     enable
  //   );
  // }

  // protected getMarkedPositions(): number[] {
  //   /*
  //     Return position numbers of dates that should be displayed as marked
  //     (position in array returned by `this.buildPicklistValues`).
  //   */
  //   const { marked } = this.props;

  //   if (marked) {
  //     return getMarkedDays(marked, this.state.date, DAYS_ON_PAGE);
  //   } else {
  //     return [];
  //   }
  // }

  // protected getMarkedTipsPositions(): string[] {
  //   /*
  //     Return position numbers of dates that should be displayed as marked
  //     (position in array returned by `this.buildPicklistValues`).
  //   */
  //   const { marked, markedtip } = this.props;

  //   if (marked && markedtip) {
  //     return getMarkedTips(marked, markedtip, this.state.date, DAYS_ON_PAGE);
  //   } else {
  //     return [];
  //   }
  // }

  // protected isNextPageAvailable = (): boolean => {
  //   const { maxDate, enable } = this.props;
  //   if (isArray(enable)) {
  //     return some(enable, enabledDate =>
  //       enabledDate.isAfter(this.state.date, "month")
  //     );
  //   }

  //   return isNextPageAvailable(this.state.date, maxDate);
  // };

  // protected isPrevPageAvailable = (): boolean => {
  //   const { minDate, enable } = this.props;
  //   if (isArray(enable)) {
  //     return some(enable, enabledDate =>
  //       enabledDate.isBefore(this.state.date, "month")
  //     );
  //   }

  //   return isPrevPageAvailable(this.state.date, minDate);
  // };

  protected handleChange = (
    e: React.SyntheticEvent<HTMLElement>,
    { value }
  ): void => {
    // `value` is selected date(string) like '31' or '1'
    const data: DayPickerOnChangeData = {
      ...this.props,
      value: {
        // year: this.state.date.year(),
        // month: this.state.date.month(),
        // date: parseInt(value, 10)
        data: value
      }
    };

    this.props.onChange(e, data);
  };

  // protected switchToNextPage = (
  //   e: React.SyntheticEvent<HTMLElement>,
  //   data: any,
  //   callback: () => void
  // ): void => {
  //   this.setState(({ date }) => {
  //     const nextDate = date.clone();
  //     nextDate.add(1, "month");

  //     return { date: nextDate };
  //   }, callback);
  // };

  // protected switchToPrevPage = (
  //   e: React.SyntheticEvent<HTMLElement>,
  //   data: any,
  //   callback: () => void
  // ): void => {
  //   this.setState(({ date }) => {
  //     const prevDate = date.clone();
  //     prevDate.subtract(1, "month");

  //     return { date: prevDate };
  //   }, callback);
  // };
}

export default DayPicker;
