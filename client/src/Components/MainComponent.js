import React, { useContext } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Login from './LoginComponent';
import Register from './RegisterComponent';
import Department from './DepartmentComponent';
import Profile from './ProfileComponent';
import CriteriaFive from '../Criteria/CriteraFive';
import CriteriaFiveDetails from '../CriteriaDetails/CriteriaFiveDetails';
import CoordinatorPanel from '../Components/CoordinatorPanelComponent';
import AllFacultyDetails from '../Components/AllFacultyDetailsComponent';
import { AuthContext } from '../Context/AuthContext';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

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

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#001064',
            dark: '#00003a',
        },
    },
});

function Main() {
    const authContext = useContext(AuthContext);

    return (
        <Switch>
            <ThemeProvider theme={theme}>
                <Route exact path='/'>
                    <Login />
                </Route>
                <Route path='/register'>
                    <Register />
                </Route>
                <PrivateRoute path='/department' component={Department} isAuthenticated={authContext.isAuthenticated} />
                <PrivateRoute path='/profile' component={Profile} isAuthenticated={authContext.isAuthenticated} />
                <PrivateRoute path='/criteria5' component={CriteriaFive} isAuthenticated={authContext.isAuthenticated} />
                <PrivateRoute path='/criteria5details' component={CriteriaFiveDetails} isAuthenticated={authContext.isAuthenticated} />
                {authContext.user.isCoordinator ? <PrivateRoute path='/coordinator' component={CoordinatorPanel} isAuthenticated={authContext.isAuthenticated} /> : null}
                {authContext.user.isCoordinator ? <PrivateRoute path='/allfacultydetails' component={AllFacultyDetails} isAuthenticated={authContext.isAuthenticated} /> : null}
            </ThemeProvider>
        </Switch>
    )
}

export default withRouter(Main);