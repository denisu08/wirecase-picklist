import React from 'react';
import _ from 'lodash';
import { StringTemplateEngine } from '../../lib';
import PicklistView from '../../views/PicklistView';
import {
  BasePickerOnChangeData,
  BasePickerProps,
  SingleSelectionPicker,
} from '../BasePicker';
import { Loader, Dimmer } from 'semantic-ui-react';

const PAGE_WIDTH = 7;

export interface ListPickerOnChangeData extends BasePickerOnChangeData {
  value: {
    data: string;
  };
}

type ListPickerProps = BasePickerProps;

class ListPicker extends SingleSelectionPicker<ListPickerProps> {
  private stringTemplateEngine: StringTemplateEngine;

  constructor(props) {
    super(props);
    this.PAGE_WIDTH = PAGE_WIDTH;
    this.stringTemplateEngine = new StringTemplateEngine();
    this.handlePaginationChange = this.handlePaginationChange.bind(this);
    this.filterChange = this.filterChange.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }

  public componentDidMount() {
    this.buildPicklistValues();
  }

  public shouldComponentUpdate(nextProps) {
    if (this.props.datasource !== nextProps.datasource) {
      this.buildPicklistValues(null, null, nextProps.datasource);
    }

    return true;
  }

  public render() {
    const {
      onChange,
      value,
      closePopup,
      closable,
      inline,
      isPickerInFocus,
      isTriggerInFocus,
      onPicklistViewMount,
      localization,
      fields,
      datasource,
      pageSize,
      page,
      pages,
      filtered,
      ...rest
    } = this.props;

    const {
      page: prevPage,
      pages: prevPages,
      filtered: prevFiltered,
      allData,
      listData,
      isLoading,
    } = this.state;
    const fieldFiltered = this.buildPicklist();

    const activePage = page || prevPage || 0;

    return (
      <React.Fragment>
        <Dimmer active={isLoading} inverted>
          <Loader inverted />
        </Dimmer>
        <PicklistView
          {...rest}
          values={listData || []}
          rawData={allData || []}
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
          columns={fieldFiltered}
          activeItemIndex={this.getActiveRowPosition(activePage)}
          page={activePage}
          pages={pages || prevPages || 0}
          filtered={filtered || prevFiltered || {}}
          handlepagechange={(e, data) => this.handlePaginationChange(e, data)}
          closePopup={() => this.closePopup()}
          closable={closable}
          filterchange={this.filterChange}
        />
      </React.Fragment>
    );
  }

  protected getActiveRowPosition(activePage): number {
    const { value, format, pageSize } = this.props;
    const { allData } = this.state;
    let active = -1;
    if (value && allData) {
      let dataChopped = allData;
      if (allData.length > 5 && activePage * 5) {
        dataChopped = allData.slice(
          pageSize * activePage,
          pageSize * activePage + pageSize,
        );
      }

      dataChopped.forEach((item, index) => {
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

  protected closePopup() {
    const { closePopup } = this.props;
    closePopup();
  }

  /** Keeps internal state in sync with input field value. */
  protected handlePaginationChange(
    e?: React.SyntheticEvent<HTMLElement>,
    data?: any,
  ) {
    const { onFetchEvent } = this.props;
    if (onFetchEvent) {
      const { pages, allData, data: selected, filterParam } = this.state;
      onFetchEvent({
        filtered: filterParam,
        data: allData,
        selected,
        page: Math.abs(data.value),
        pages,
        pageSize: 5,
      });
    } else {
      this.buildPicklistValues(data.value, null);
    }
  }

  protected buildPicklist(): any[] {
    const { fields } = this.props;
    const columnHeader = [];
    fields.forEach((item) => {
      if (item.displayFlag) {
        columnHeader.push(item);
      }
    });

    return columnHeader;
  }

  protected filterChange(
    e: React.SyntheticEvent<HTMLElement>,
    data: any,
  ): void {
    const { onFetchEvent, page: prevPage, pages: prevPages } = this.props;
    this.setState({
      filterParam: data.value,
    });

    if (onFetchEvent) {
      const { page, pages, allData, data: selected } = this.state;
      let pPage = page === null ? prevPage : page;
      if (pPage === undefined) {
        pPage = 0;
      }
      let pPages = pages === null ? prevPages : pages;
      if (pPages === undefined) {
        pPages = 0;
      }

      const params = {
        filtered: data.value,
        data: allData,
        selected,
        page: pPage,
        pages: pPages,
        pageSize: 5,
      };
      onFetchEvent(params);
    } else {
      this.buildPicklistValues(null, data.value);
    }
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

  protected buildPicklistValues(
    overridePage = null,
    newFilterParam = null,
    newDS = null,
  ): any[] {
    const {
      fields,
      datasource: oldDS,
      fetchurl,
      fetchkey,
      pageSize,
      onFetchEvent,
    } = this.props;
    const datasource = newDS || oldDS;
    const { page, filterParam: prevFilterParam } = this.state;
    const filterParam = newFilterParam || prevFilterParam || {};
    const result = [];
    let currentPage = 0;
    if (overridePage !== undefined) {
      currentPage = overridePage;
    } else if (page !== undefined) {
      currentPage = page;
    }

    const needFiltered = onFetchEvent ? false : true;
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
    if (fetchurl) {
      this.setState({ isLoading: true });
      const urlReplaced = this.stringTemplateEngine.format(fetchurl, {
        values: Object.assign(filterParam, {
          page: currentPage,
          pageSize,
        }),
      });

      fetch(urlReplaced)
        .then((response) => response.json())
        .then((res) => {
          const pages = res[fetchkey.pages];
          const allData = res[fetchkey.data];
          allData.forEach((data) => {
            result.push(
              /* _.pickBy(Object.assign(data), (value, key) => {
                return keyFields.includes(key);
              }),*/
              data,
            );
          });

          this.setState({
            page: currentPage,
            pages,
            allData,
            listData: result,
            isLoading: false,
          });
        });
    } else if (datasource) {
      let sliceData = datasource;
      if (needFiltered && filterParam && !_.isEmpty(filterParam)) {
        sliceData = datasource.filter((el) => {
          let gotIt = true;
          Object.keys(filterParam).forEach((key) => {
            if (!gotIt || !_.get(filterParam, key)) {
              return;
            }
            const filterValue = _.get(el, key) || '';
            const filterArg = _.get(filterParam, key) || '';
            if (Array.isArray(filterArg)) {
              if (filterArg.length > 0) {
                gotIt = filterArg.includes(filterValue);
              }
            } else {
              gotIt = filterValue.indexOf(filterArg) >= 0;
            }
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
          /* _.pickBy(Object.assign(data), (value, key) => {
            return keyFields.includes(key);
          }), */
          data,
        );
      });

      this.setState({
        page: currentPage,
        allData: datasource,
        listData: result,
        pages: totalPage,
      });
    }

    return result;
  }
}

export default ListPicker;
