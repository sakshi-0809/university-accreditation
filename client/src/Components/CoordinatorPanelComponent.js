import React from 'react';
import { withRouter } from 'react-router';
import Navbar from './NavbarComponent';

function CoordinatorPanel(props) {
    return (
        <div>
            <Navbar history={props.history} path={"department"}></Navbar>
        </div>
    )
}

export default withRouter(CoordinatorPanel);