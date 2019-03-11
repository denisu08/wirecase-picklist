import React from 'react';

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
      />
    );
  }

  protected buildPicklistValues(): string[] {
    /*
      Return array of strings like ['31', '1', ...]
      that used to populate picklist's page.
    */
    return [];
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
  }
}

export default ListPicker;
