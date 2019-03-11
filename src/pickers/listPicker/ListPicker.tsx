import React from 'react';
import { StringTemplateEngine } from '../../lib';

import PicklistView from '../../views/PicklistView';
import {
  BasePickerOnChangeData,
  BasePickerProps,
  SingleSelectionPicker,
} from '../BasePicker';

const PAGE_WIDTH = 7;

export interface ListPickerOnChangeData extends BasePickerOnChangeData {
  value: {
    data: string;
  };
}

type ListPickerProps = BasePickerProps;

class ListPicker extends SingleSelectionPicker<
  ListPickerProps
> /* implements ProvideHeadingValue */ {
  private stringTemplateEngine: StringTemplateEngine;

  constructor(props) {
    super(props);
    this.PAGE_WIDTH = PAGE_WIDTH;
    this.stringTemplateEngine = new StringTemplateEngine();
  }

  public render() {
    const {
      onChange,
      value,
      closePopup,
      inline,
      isPickerInFocus,
      isTriggerInFocus,
      onPicklistViewMount,
      localization,
      ...rest
    } = this.props;

    return (
      <PicklistView
        {...rest}
        values={this.buildPicklistValues()}
        hasNextPage
        hasPrevPage
        onNextPageBtnClick={null}
        onPrevPageBtnClick={null}
        onValueClick={this.handleChange}
        onBlur={this.handleBlur}
        inline={this.props.inline}
        onMount={this.props.onPicklistViewMount}
        hoveredItemIndex={this.state.hoveredCellPosition}
        onCellHover={this.onHoveredCellPositionChange}
        localization={localization}
        currentHeadingValue='test'
        activeItemIndex={this.getActiveRowPosition()}
      />
    );
  }

  protected getActiveRowPosition(): number {
    const { value, format } = this.props;
    const buildValues = this.buildPicklistValues();
    console.log('getActiveRowPosition', value || {}, buildValues || {});
    let active = -1;
    if (value) {
      buildValues.forEach((item, index) => {
        if (active === -1) {
          const dataFormatted = this.stringTemplateEngine.format(format, {
            values: item || {},
          });
          if (dataFormatted === value) {
            active = index;
          }
        }
      });
    }

    return active;
  }

  protected buildPicklistValues(): any[] {
    /*
      Return array of strings like ['31', '1', ...]
      that used to populate picklist's page.
    */
    // const { format, value } = this.props;
    // console.log(
    //   'test',
    //   this.stringTemplateEngine.format(format, {
    //     values: value ? JSON.parse(value) : {},
    //   }),
    // );
    // return this.props.fields;
    return [
      { name: 'Jamie', status: 'Approved', notes: 'Requires call' },
      { name: 'John', status: 'Selected', notes: 'None' },
      { name: 'Jakun', status: 'Approved', notes: 'Requires call' },
      { name: 'Jill', status: 'Approved', notes: 'None' },
    ];
  }

  protected handleChange = (
    e: React.SyntheticEvent<HTMLElement>,
    { value },
  ): void => {
    // `value` is selected string like '31' or '1'
    const data: ListPickerOnChangeData = {
      ...this.props,
      value: {
        data: value,
      },
    };

    this.props.onChange(e, data);
  };
}

export default ListPicker;
