import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Segment } from 'semantic-ui-react';


class AppMenu extends Component {
  state = { activeItem: 'User' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    return (
      <div className='app-menu'>
        <Menu pointing secondary fixed='' color='blue' >
            <Menu.Item name='User' active={activeItem === 'User'} onClick={this.handleItemClick} as={NavLink} to='/user' />
        </Menu>
        <Segment basic>
          {this.props.children}
        </Segment>
      </div>
    )
  }
}

export default AppMenu;
