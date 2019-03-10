import isNil from "lodash/isNil";
import invoke from "lodash/invoke";
import moment, { Moment } from "moment";
import PropTypes from "prop-types";
import React from "react";

// import CustomPropTypes from "../lib/CustomPropTypes";
import { BasePickerOnChangeData } from "../pickers/BasePicker";
import DayPicker from "../pickers/dayPicker/DayPicker";
import InputView from "../views/InputView";
import BaseInput, {
  BaseInputProps,
  BaseInputState,
  DateRelatedProps
} from "./BaseInput";

// import { tick } from "../lib";
import {
  //   buildValue,
  //   parseArrayOrValue,
  //   parseValue,
  //   dateValueToString,
  picklistValueToString
} from "./parse";
// import { getDisabledMonths, getDisabledYears } from "./shared";

type PicklistMode = "single" | "multi";

export interface DateInputProps extends BaseInputProps, DateRelatedProps {
  /** Display mode to start. */
  startMode?: PicklistMode;
}

export interface DateInputOnChangeData extends DateInputProps {
  value: string;
}

interface DateInputState extends BaseInputState {
  mode: PicklistMode;
  valueText: string;
  // year: number;
  // month: number;
  // date: number;
}

// interface Dateparams {
//   year: number;
//   month: number;
//   date: number;
// }

class DateInput extends BaseInput<DateInputProps, DateInputState> {
  /**
   * Component responsibility:
   *  - parse input value
   *  - handle underlying picker change
   */
  public static readonly defaultProps = {
    ...BaseInput.defaultProps,
    valueFormat: "${id}",
    startMode: "single",
    preserveViewMode: true,
    icon: "calendar"
  };

  public static readonly propTypes = {
    /** Currently selected value. */
    value: PropTypes.string.isRequired,
    /** Moment date formatting string. */
    valueFormat: PropTypes.string,
    /** Date to display initially when no date is selected. */
    initialValue: PropTypes.oneOfType([PropTypes.string]),
    /** Preserve viewmode on focus? */
    preserveViewMode: PropTypes.bool,
    /** Display mode to start. */
    startMode: PropTypes.oneOf(["single"]),
    /** If true, popup closes after selecting a date-time. */
    closable: PropTypes.bool,
    /**
     * Called on clear.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and proposed value.
     */
    onClear: PropTypes.func,
    /** Using the clearable setting will let users remove their selection from a picklist. */
    clearable: PropTypes.bool,
    /** Optional Icon to display inside the clearable Input. */
    clearIcon: PropTypes.any,
    /** Duration of the CSS transition animation in milliseconds. */
    duration: PropTypes.number,
    /** Named animation event to used. Must be defined in CSS. */
    animation: PropTypes.string,
    /** Moment date localization. */
    localization: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    iconPosition: PropTypes.oneOf(["left", "right"])
  };

  constructor(props: DateInputProps) {
    super(props);
    // const parsedValue = parseValue(
    //   props.value,
    //   props.dateFormat,
    //   props.localization
    // );
    this.state = {
      mode: props.startMode,
      popupIsClosed: true,
      valueText: props.value
      // year: parsedValue ? parsedValue.year() : undefined,
      // month: parsedValue ? parsedValue.month() : undefined,
      // date: parsedValue ? parsedValue.date() : undefined
    };
  }

  public render() {
    const {
      value,
      valueFormat,
      initialValue,
      // disable,
      // enable,
      // maxDate,
      // minDate,
      preserveViewMode,
      startMode,
      closable,
      // markColor,
      // marked,
      localization,
      onChange,
      ...rest
    } = this.props;

    return (
      <InputView
        closePopup={this.closePopup}
        openPopup={this.openPopup}
        popupIsClosed={this.state.popupIsClosed}
        onMount={this.onInputViewMount}
        onFocus={this.onFocus}
        onChange={this.onInputValueChange}
        {...rest}
        renderPicker={() => this.getPicker()}
        value={picklistValueToString(value, valueFormat, localization)}
      />
    );
  }

  private parseInternalValue(): string {
    /*
      Creates moment instance from values stored in component's state
      (year, month, date) in order to pass this moment instance to
      underlying picker.
      Return undefined if none of these state fields has value.
    */
    // const { year, month, date } = this.state;
    // if (!isNil(year) || !isNil(month) || !isNil(date)) {
    //   return moment({ year, month, date });
    // }
    return this.state.valueText;
  }

  private getPicker = () => {
    const {
      value,
      initialDate,
      dateFormat,
      disable,
      minDate,
      maxDate,
      enable,
      inline,
      marked,
      markedtip,
      markColor,
      localization,
      tabIndex,
      pickerWidth,
      pickerStyle
    } = this.props;

    const pickerProps = {
      isPickerInFocus: this.isPickerInFocus,
      isTriggerInFocus: this.isTriggerInFocus,
      inline,
      onPicklistViewMount: this.onPicklistViewMount,
      closePopup: this.closePopup,
      tabIndex,
      pickerWidth,
      pickerStyle,
      onChange: this.handleSelect,
      initializeWith: this.parseInternalValue(),
      value,
      // initializeWith: buildValue(
      //   this.parseInternalValue(),
      //   initialDate,
      //   localization,
      //   dateFormat
      // ),
      // value: buildValue(value, null, localization, dateFormat, null),
      // enable: parseArrayOrValue(enable, dateFormat, localization),
      // minDate: parseValue(minDate, dateFormat, localization),
      // maxDate: parseValue(maxDate, dateFormat, localization),
      localization
    };
    // const disableParsed = parseArrayOrValue(disable, dateFormat, localization);
    // const markedParsed = parseArrayOrValue(marked, dateFormat, localization);

    return (
      <DayPicker
        {...pickerProps}
        // disable={disableParsed}
        // marked={markedParsed}
        // markedtip={markedtip}
        // markColor={markColor}
      />
    );
  };

  private onFocus = (): void => {
    if (!this.props.preserveViewMode) {
      this.setState({ mode: this.props.startMode });
    }
  };

  private handleSelect = (e, { value }: BasePickerOnChangeData) => {
    this.closePopup();
    // this.setState(prevState => {
    //   console.log("prevState", prevState);
    // const outValue = moment(value).format(this.props.dateFormat);
    invoke(this.props, "onChange", e, {
      ...this.props,
      value: `${JSON.stringify(value.data)}`
    });

    // return {
    //   year: value.year,
    //   month: value.month,
    //   date: value.date
    // };

    return {
      valueText: `${JSON.stringify(value.data)}`
    };
    // });
  };

  /** Keeps internal state in sync with input field value. */
  private onInputValueChange = (e, { value }) => {
    const parsedValue = moment(value, this.props.dateFormat);
    if (parsedValue.isValid()) {
      // this.setState({
      //   year: parsedValue.year(),
      //   month: parsedValue.month(),
      //   date: parsedValue.date()
      // });
      this.setState({
        valueText: value
      });
    }
    invoke(this.props, "onChange", e, { ...this.props, value });
  };
}

export default DateInput;
