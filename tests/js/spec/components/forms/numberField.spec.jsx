import React from 'react';

import {Form, NumberField} from 'app/components/forms';
import {shallow, mount} from 'enzyme';

jest.mock('jquery');

describe('NumberField', function() {
  describe('render()', function() {
    it('renders', function() {
      let wrapper = shallow(<NumberField name="fieldName" />);
      expect(wrapper).toMatchSnapshot();
    });

    it('renders with optional attributes', function() {
      let wrapper = shallow(<NumberField name="fieldName" min={0} max={100} />);
      expect(wrapper).toMatchSnapshot();
    });

    it('renders with value', function() {
      let wrapper = shallow(<NumberField name="fieldName" value={5} />);
      expect(wrapper).toMatchSnapshot();
    });

    it('renders with form context', function() {
      let wrapper = shallow(<NumberField name="fieldName" />, {
        context: {
          form: {
            data: {
              fieldName: 5,
            },
            errors: {},
          },
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('doesnt save `NaN` when new value is empty string', function() {
      let wrapper = mount(
        <Form onSubmit={() => {}}>
          <NumberField name="fieldName" defaultValue="2" />
        </Form>
      );
      wrapper.find('input').simulate('change', {target: {value: ''}});
      expect(wrapper.state('data').fieldName).toBe('');
    });
  });
});
