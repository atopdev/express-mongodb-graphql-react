import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  AppFooter,
  AppHeader,
  AppHeaderDropdown,
  AppNavbarBrand,
} from '@coreui/react';
import {
  Nav,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Dashboard from '../../../routes/Dashboard';

import logo from '../../../assets/images/logo.png';

class PrivateApp extends React.Component {
  render() {
    const { data: { loading, me } } = this.props;

    if(loading) {
      return <div>loading...</div>
    }

    return (
      <div className="app">
        <AppHeader fixed>
          <AppNavbarBrand
            full={{ src: logo, width: 89, height: 25, alt: 'GraphQL' }}
            minimized={{ src: logo, width: 30, height: 30, alt: 'GraphQL' }}
          />
          <Nav className="ml-auto mr-2" navbar>
            <AppHeaderDropdown direction="down">
              <DropdownToggle nav>
                Hi, {me.username}
              </DropdownToggle>
              <DropdownMenu right style={{ right: 'auto' }}>
                <DropdownItem onClick={() => this.props.logoutUser()}><i className="icon-logout icons"></i> Logout</DropdownItem>
              </DropdownMenu>
            </AppHeaderDropdown>
          </Nav>
        </AppHeader>
        <div className="app-body">
          <main className="main">
            <Switch>
              <Route exact path="/" component={Dashboard} />
            </Switch>
          </main>
        </div>
        <AppFooter>
          <span>&copy; 2018 GraphQL Demo App</span>
          <span className="ml-auto">Powered by <a href="javascript:void(0);">GraphQL</a></span>
        </AppFooter>
      </div>
    );
  }
}

export default graphql(gql`
  query {
    me {
      username,
      email
    }
  }
`)(PrivateApp);
