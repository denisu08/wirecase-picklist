import React from 'react';
import _ from 'lodash';
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
      fields,
      datasource,
      url,
      ...rest
    } = this.props;

    return (
      <PicklistView
        {...rest}
        values={this.buildPicklistValues()}
        rawData={this.buildPicklistValues(false)}
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
        fields={fields}
        columns={this.buildPicklistHeader()}
        activeItemIndex={this.getActiveRowPosition()}
      />
    );
  }

  protected getActiveRowPosition(): number {
    const { value, format } = this.props;
    const buildValues = this.buildPicklistValues(false);
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

  protected buildPicklistHeader(): string[] {
    const { fields } = this.props;
    const columnHeader = [];
    fields.forEach((item) => {
      if (item.displayFlag) {
        columnHeader.push(item.name);
      }
    });

    return columnHeader;
  }

  protected buildPicklistValues(filter = true): any[] {
    const { fields, datasource, url } = this.props;
    const result = !filter ? datasource : [];

    if (!fields) {
      return [];
    }

    const keyFields = [];
    fields.forEach((item) => {
      if (item.displayFlag) {
        keyFields.push(item.model);
      }
    });

    if (filter) {
      if (datasource) {
        datasource.forEach((data) => {
          result.push(
            _.pickBy(Object.assign(data), (value, key) => {
              return keyFields.includes(key);
            }),
          );
        });
      } else if (url) {
        // TODO: add URL
        console.log('url ada neh', url);
      }
    }

    return result;
  }

  protected handleChange = (
    e: React.SyntheticEvent<HTMLElement>,
    { value },
  ): void => {
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
