import React from 'react';
import NotFound from './NotFound';
import toJson from "enzyme-to-json";
import { shallow, mount } from "enzyme";

it('renders without crashing using shallow', () => {
  shallow(<NotFound />)
});

it('renders without crashing using mount', () => {
  mount(<NotFound />)
});

it("matches snapshot", function () {
  let wrapper = shallow(<NotFound />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});