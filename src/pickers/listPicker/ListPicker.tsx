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
    this.handlePaginationChange = this.handlePaginationChange.bind(this);
    this.filterChange = this.filterChange.bind(this);

    this.setState({
      allData: [],
      listData: [],
      totalPage: 0,
    });
  }

  public componentDidMount() {
    this.buildPicklistValues();
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
      pageSize,
      url,
      ...rest
    } = this.props;
    const { activePage, totalPage, allData, listData } = this.state;

    return (
      <PicklistView
        {...rest}
        values={listData}
        rawData={allData}
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
        activePage={activePage}
        pageSize={totalPage}
        handlepagechange={this.handlePaginationChange}
        filterchange={this.filterChange}
      />
    );
  }

  protected getActiveRowPosition(): number {
    const { value, format } = this.props;
    const { listData } = this.state;
    let active = -1;
    if (value && listData) {
      listData.forEach((item, index) => {
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

  /** Keeps internal state in sync with input field value. */
  protected handlePaginationChange(
    e?: React.SyntheticEvent<HTMLElement>,
    data?: any,
  ) {
    this.buildPicklistValues(data.value);
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

  protected filterChange(
    e: React.SyntheticEvent<HTMLElement>,
    data: any,
  ): void {
    this.setState({
      filterParam: data.value,
    });
    this.buildPicklistValues();
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

  protected buildPicklistValues(overrideActivePage = null): any[] {
    const { fields, datasource, url, pageSize } = this.props;
    const { activePage, filterParam } = this.state;
    const result = [];
    const currentPage = (overrideActivePage || (activePage || 1)) - 1;

    if (!fields) {
      return [];
    }

    const keyFields = [];
    fields.forEach((item) => {
      if (item.displayFlag) {
        keyFields.push(item.model);
      }
    });

    // chop based on page
    if (datasource) {
      let sliceData = datasource;
      if (filterParam && !_.isEmpty(filterParam)) {
        sliceData = datasource.filter((el) => {
          let gotIt = true;
          Object.keys(filterParam).forEach((key) => {
            if (!gotIt || !_.get(filterParam, key)) {
              return;
            }
            gotIt = _.get(el, key).indexOf(_.get(filterParam, key)) >= 0;
          });

          return gotIt;
        });
      }

      const totalPage = Math.ceil(sliceData.length / pageSize);

      sliceData = sliceData.slice(
        pageSize * currentPage,
        pageSize * currentPage + pageSize,
      );

      sliceData.forEach((data) => {
        result.push(
          _.pickBy(Object.assign(data), (value, key) => {
            return keyFields.includes(key);
          }),
        );
      });

      this.setState({
        activePage: currentPage + 1,
        allData: datasource,
        listData: result,
        totalPage,
      });
    } else if (url) {
      // TODO: add URL
      console.log('url ada neh', url);
    }

    return result;
  }
}

export default ListPicker;