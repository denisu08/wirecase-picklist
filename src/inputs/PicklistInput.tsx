import invoke from 'lodash/invoke';
import PropTypes from 'prop-types';
import React from 'react';

import { BasePickerOnChangeData } from '../pickers/BasePicker';
import ListPicker from '../pickers/listPicker/ListPicker';
import InputView from '../views/InputView';
import BaseInput, {
  BaseInputProps,
  BaseInputState,
  PicklistRelatedProps,
} from './BaseInput';
import { StringTemplateEngine } from '../lib';
import { picklistValueToString } from './parse';

type PicklistMode = 'single' | 'multi';

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
    format: '{{name}}',
    startMode: 'single',
    preserveViewMode: true,
    icon: 'hand lizard outline',
    pagesize: 5,
  };

  public static readonly propTypes = {
    /** Currently selected value. */
    value: PropTypes.string.isRequired,
    /** Picklist formatting string. */
    format: PropTypes.string,
    /** Date to display initially when no date is selected. */
    initial: PropTypes.string,
    /** Preserve viewmode on focus? */
    preserveViewMode: PropTypes.bool,
    /** Display mode to start. */
    startMode: PropTypes.oneOf(['single']),
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
    iconPosition: PropTypes.oneOf(['left', 'right']),
  };

  private stringTemplateEngine: StringTemplateEngine;

  constructor(props: PicklistInputProps) {
    super(props);
    this.state = {
      mode: props.startMode,
      popupIsClosed: true,
      valueText: props.value,
    };
    this.stringTemplateEngine = new StringTemplateEngine();
  }

  public render() {
    const {
      value,
      format,
      fields,
      datasource,
      fetchkey,
      fetchurl,
      initial,
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
        value={picklistValueToString(value, format, localization)}
        fields={fields}
        datasource={datasource}
        fetchurl={fetchurl}
        fetchkey={fetchkey}
      />
    );
  }

  private parseInternalValue(): string {
    return this.state.valueText;
  }

  private getPicker = () => {
    const {
      value,
      format,
      inline,
      localization,
      tabIndex,
      pickerWidth,
      pickerStyle,
      datasource,
      fields,
      fetchurl,
      fetchkey,
      pagesize,
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
      initial: this.parseInternalValue(),
      value,
      pagesize,
      format,
      localization,
      datasource,
      fields,
      fetchurl,
      fetchkey,
    };

    return <ListPicker {...pickerProps} />;
  };

  private onFocus = (): void => {
    const { preserveViewMode, startMode } = this.props;
    if (!preserveViewMode) {
      this.setState({ mode: startMode });
    }
  };

  private handleSelect = (e, { value }: BasePickerOnChangeData) => {
    this.closePopup();

    const { format } = this.props;
    const dataFormatted = this.stringTemplateEngine.format(format, {
      values: value.data || {},
    });

    invoke(this.props, 'onChange', e, {
      ...this.props,
      value: `${dataFormatted}`,
    });

    return {
      valueText: `${dataFormatted}`,
    };
  };

  /** Keeps internal state in sync with input field value. */
  private onInputValueChange = (e, { value }) => {
    let valueFormatted = value;
    if (valueFormatted) {
      const { format } = this.props;
      valueFormatted = this.stringTemplateEngine.format(format, {
        values: JSON.parse(value),
      });
      this.setState({
        valueText: valueFormatted,
      });
    }
    invoke(this.props, 'onChange', e, { ...this.props, value: valueFormatted });
  };
}

export default PicklistInput;
