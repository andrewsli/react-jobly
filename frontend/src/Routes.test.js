import React from 'react';
import Nav from "./Nav";
import Routes from './Routes';
import toJson from "enzyme-to-json";
import { shallow, mount } from "enzyme";
import { MemoryRouter } from "react-router-dom"

it('renders without crashing using shallow', () => {
  shallow(<Routes />)
});

it('renders without crashing using mount', () => {
  mount(<MemoryRouter>
    <Routes />
  </MemoryRouter>);
});

it("matches snapshot", function () {
  let wrapper = shallow(<Routes />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});

describe("should render component corresponding to url (unit)", function () {
  it("should go to home page with '/'", function () {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/", "/companies", "/jobs", "/profile", "/login", "/logout", "/notapage"]}
        initialIndex={0}>
        <Routes />
      </MemoryRouter>);

    expect(wrapper.find("Home").length).toBe(1);
  });

  it("should go to companies page with '/companies'", function () {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/", "/companies", "/jobs", "/profile", "/login", "/logout", "/notapage"]}
        initialIndex={1}>
        <Routes />
      </MemoryRouter>);

    expect(wrapper.find("Companies").length).toBe(1);
  });

  it("should go to jobs page with '/jobs'", function () {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/", "/companies", "/jobs", "/profile", "/login", "/logout", "/notapage"]}
        initialIndex={2}>
        <Routes />
      </MemoryRouter>);

    expect(wrapper.find("Jobs").length).toBe(1);
  });

  it("should go to user profile page with '/profile'", function () {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/", "/companies", "/jobs", "/profile", "/login", "/logout", "/notapage"]}
        initialIndex={3}>
        <Routes />
      </MemoryRouter>);

    expect(wrapper.find("Profile").length).toBe(1);
  });

  it("should go to profile page with '/login' when logged out", function () {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/", "/companies", "/jobs", "/profile", "/login", "/logout", "/notapage"]}
        initialIndex={4}>
        <Routes />
      </MemoryRouter>);

    expect(wrapper.find("LoginSignup").length).toBe(1);
  });

  it("should redirect to home page with /logout when logged in", function () {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/", "/companies", "/jobs", "/profile", "/login", "/logout", "/notapage"]}
        initialIndex={5}>\
        <Routes />
      </MemoryRouter>);

    expect(wrapper.find("Home").length).toBe(1);
  });


  it("should return not found with non existent page", function () {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/", "/companies", "/jobs", "/profile", "/login", "/logout", "/notapage"]}
        initialIndex={6}>
        <Routes />
      </MemoryRouter>);

    expect(wrapper.find("NotFound").length).toBe(1);
  });
})

describe("renders right component when link is clicked", function () {
  it("should go to home page when the logo in nav bar is clicked (integrated)",
    function () {
      const wrapper = mount(
        <MemoryRouter>
          <Nav />
          <Routes />
        </MemoryRouter>);

      wrapper
        .find('a[href="/"]')
        .simulate("click", { button: 0 });

      expect(wrapper.find("Home").length).toBe(1);
    });

  it("should go to the companies page when the companies tab is clicked",
    function () {
      const wrapper = mount(
      <MemoryRouter>
        <Nav />
        <Routes />
      </MemoryRouter>);

      wrapper
        .find('a[href="/companies"]')
        .simulate("click", { button: 0 });
      
      expect(wrapper.find("Companies")).toHaveLength(1);
    });

  it("should go to the jobs page when the jobs tab is clicked",
    function () {
      const wrapper = mount(
      <MemoryRouter>
        <Nav />
        <Routes />
      </MemoryRouter>);

      wrapper
        .find('a[href="/jobs"]')
        .simulate("click", { button: 0 });

      expect(wrapper.find("Jobs")).toHaveLength(1);
    });

  it("should go to the profile page when the profile tab is clicked",
    function () {
      const wrapper = mount(
      <MemoryRouter>
        <Nav />
        <Routes />
      </MemoryRouter>);

      wrapper
        .find('a[href="/profile"]')
        .simulate("click", { button: 0 });

      expect(wrapper.find("Profile")).toHaveLength(1);
    });

  it("should log out when the log out button is clicked",
    function () {
      const wrapper = mount(
      <MemoryRouter>
        <Nav loggedIn={true}/>
        <Routes />
      </MemoryRouter>);

      wrapper
        .find('a[href="/logout"]')
        .simulate("click", { button: 0 });

      expect(wrapper.find("Home")).toHaveLength(1);
    });

  it("should show the log in form when the log in button is clicked",
    function () {
      const wrapper = mount(
      <MemoryRouter>
        <Nav loggedIn={false}/>
        <Routes />
      </MemoryRouter>);

      wrapper
        .find('a[href="/login"]')
        .simulate("click", { button: 0 });
      
      expect(wrapper.find("LoginSignup")).toHaveLength(1);
    });
})
