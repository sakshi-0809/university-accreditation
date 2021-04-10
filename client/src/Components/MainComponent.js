import React, { useContext, useEffect, useState } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Login from './LoginComponent';
import Register from './RegisterComponent';
import Criteria from './CriteriaComponent';
import { AuthContext } from '../Context/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) => {
            return (
                rest.isAuthenticated
                    ? <Component {...props} />
                    : <Redirect to='/' />
            )
        }} />
    )
}

function Main() {
    const authContext = useContext(AuthContext);
    // const [notes, setNotes] = useState([{}]);

    // useEffect(() => {
    //     setNotes(authContext.user.notes);
    // }, [authContext.user.notes])

    return (
        <Switch>
            <Route exact path='/'>
                <Login />
            </Route>
            <Route path='/register'>
                <Register />
            </Route>
            <PrivateRoute path='/criteria' component={Criteria} isAuthenticated={authContext.isAuthenticated} />
        </Switch>
    )
}

export default withRouter(Main);