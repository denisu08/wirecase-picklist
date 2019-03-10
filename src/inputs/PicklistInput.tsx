import invoke from "lodash/invoke";
import PropTypes from "prop-types";
import React from "react";

import { BasePickerOnChangeData } from "../pickers/BasePicker";
import ListPicker from "../pickers/listPicker/ListPicker";
import InputView from "../views/InputView";
import BaseInput, {
  BaseInputProps,
  BaseInputState,
  PicklistRelatedProps
} from "./BaseInput";

import { picklistValueToString } from "./parse";

type PicklistMode = "single" | "multi";

export interface PicklistInputProps
  extends BaseInputProps,
    PicklistRelatedProps {
  /** Display mode to start. */
  startMode?: PicklistMode;
}

export interface PicklistInputOnChangeData extends PicklistInputProps {
  value: string;
}

interface PicklistInputState extends BaseInputState {
  mode: PicklistMode;
  valueText: string;
}

class PicklistInput extends BaseInput<PicklistInputProps, PicklistInputState> {
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
    /** Picklist formatting string. */
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
    /** Picklist localization. */
    localization: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    iconPosition: PropTypes.oneOf(["left", "right"])
  };

  constructor(props: PicklistInputProps) {
    super(props);
    this.state = {
      mode: props.startMode,
      popupIsClosed: true,
      valueText: props.value
    };
  }

  public render() {
    const {
      value,
      valueFormat,
      initialValue,
      preserveViewMode,
      startMode,
      closable,
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
    return this.state.valueText;
  }

  private getPicker = () => {
    const {
      value,
      inline,
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
      localization
    };

    return <ListPicker {...pickerProps} />;
  };

  private onFocus = (): void => {
    if (!this.props.preserveViewMode) {
      this.setState({ mode: this.props.startMode });
    }
  };

  private handleSelect = (e, { value }: BasePickerOnChangeData) => {
    this.closePopup();
    invoke(this.props, "onChange", e, {
      ...this.props,
      value: `${JSON.stringify(value.data)}`
    });

    return {
      valueText: `${JSON.stringify(value.data)}`
    };
  };

  /** Keeps internal state in sync with input field value. */
  private onInputValueChange = (e, { value }) => {
    this.setState({
      valueText: value
    });
    invoke(this.props, "onChange", e, { ...this.props, value });
  };
}

export default PicklistInput;
