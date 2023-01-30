import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";

const NavBar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar className="primary-color" dark fixed="top">
        <div className="justify-content-start">
          <NavbarToggler onClick={toggleNavbar} className="me-2" />
          <NavbarBrand href="/">LABINS</NavbarBrand>
          <span className="vertical-divider"></span>
          <NavbarText color="light">
            Land Boundary Information System: Online Information and Maps for
            the State of Florida
          </NavbarText>
          <Collapse isOpen={!collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">
                  GitHub
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default NavBar;
