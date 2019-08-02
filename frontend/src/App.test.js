import React from 'react';
import App from './App';
import toJson from "enzyme-to-json";
import { shallow, mount } from "enzyme";

it('renders without crashing using shallow', () => {
  shallow(<App />)
});

it('renders without crashing using mount', () => {
  mount(<App />)
});

it("matches snapshot", function () {
  let wrapper = shallow(<App />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});