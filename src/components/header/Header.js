import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';


class Header extends Component {
	
	render() {
		return (
			<Navbar className='header-nav'>
				<Nav>
					<NavItem eventKey={1} href="#">
						Home
					</NavItem>
					<NavItem eventKey={2} href="#">
						New Question
					</NavItem>
					<NavItem eventKey={2} href="#">
						Leader Board
					</NavItem>
				</Nav>
			</Navbar>
		);
	}
}

export default Header;