// import isNil from 'lodash/isNil';

import React from 'react';
import { Button, Form } from 'semantic-ui-react';
const buttonStyle = {
  display: 'flex',
  justifyContent: 'center',
};

// import { BodyWidth } from '../Body/Body';
// export interface FilterProps {
//   /** Header text content. */
//   title: string;
//   /** Called after click on next page button. */
//   onNextPageBtnClick: () => void;
//   /** Called after click on previous page button. */
//   onPrevPageBtnClick: () => void;
//   /** Whether to display previous page button as active or disabled. */
//   hasPrevPage: boolean;
//   /** Whether to display next page button as active or disabled. */
//   hasNextPage: boolean;
//   /** Whether to display weeks row or not. */
//   displayWeeks: boolean;
//   /** Header width. */
//   width: BodyWidth;
//   /** Text content to display in dates-range row. */
//   rangeRowContent?: string;
//   /** Moment date localization */
//   localization?: string;
// }

function Filter(/* props: FilterProps */) {
  //   const {
  //     rangeRowContent,
  //     displayWeeks,
  //     onNextPageBtnClick,
  //     onPrevPageBtnClick,
  //     hasPrevPage,
  //     hasNextPage,
  //     onHeaderClick,
  //     width,
  //     title,
  //     localization,
  //   } = props;

  return (
    <Form style={{ margin: '5px' }} size='tiny'>
      <Form.Field>
        <label>First Name</label>
        <input placeholder='First Name' id='firstName' />
      </Form.Field>
      <Form.Field>
        <label>Last Name</label>
        <input placeholder='Last Name' id='lastName' />
      </Form.Field>
      <Form.Field style={buttonStyle}>
        <Button type='button' fluid size='tiny' primary>
          Search
        </Button>
      </Form.Field>
    </Form>
  );
}

export default Filter;
