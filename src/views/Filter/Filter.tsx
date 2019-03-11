// import isNil from 'lodash/isNil';

import React from 'react';
import { Button, Form, Item } from 'semantic-ui-react';
const buttonStyle = {
  display: 'flex',
  justifyContent: 'center',
};

// import { BodyWidth } from '../Body/Body';
export interface FilterProps {
  /** Fields configuration */
  fields?: any[];
}

function Filter(props: FilterProps) {
  const { fields } = props;

  return (
    <Form style={{ margin: '5px' }} size='tiny'>
      {fields.map((item) =>
        item.searchFlag ? (
          <Form.Field>
            <label>{item.name}</label>
            <input placeholder={Item.name} id={item.model} />
          </Form.Field>
        ) : (
          ''
        ),
      )}

      <Form.Field style={buttonStyle}>
        <Button type='button' fluid size='tiny' primary>
          Search
        </Button>
      </Form.Field>
    </Form>
  );
}

export default Filter;
