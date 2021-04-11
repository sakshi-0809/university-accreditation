import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: '#00003a'
    },
    title: {
        flexGrow: 1,
    },
    card: {
        margin: theme.spacing(2),
        marginTop: theme.spacing(5),
    },
    content: {
        height: 90
    },
    cardTitle: {
        paddingBottom: theme.spacing(1),
        color: '#b7b7b7'
    },
    cardContent: {
        color: '#343434'
    }
}));

function CriteriaCard(props) {
    const classes = useStyles();

    const handleClick = () => {
        props.history.push(`/criteria${props.number}`);
    }

    return (
        <Grid item xs={3}>
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <Typography color="textSecondary" variant="h5" component="h2" className={classes.cardTitle}>
                        Criteria {props.number}
                    </Typography>
                    <Typography variant="body2" component="p" className={classes.cardContent}>
                        {props.firstPart}
                        <br />
                        {props.secondPart}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" onClick={handleClick}>Open Criteria Page</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

function Department(props) {
    const classes = useStyles();
    const authContext = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);


    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        fetch('/logout', {
            method: 'GET'
        }).then(res => res.json()).then(data => {
            console.log(data);
            props.history.push('/');
        })
    }

    const viewProfile = () => {
        props.history.push('/profile');
    }

    return (
        <div>
            <div className={classes.root}>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            {authContext.user.department}
                        </Typography>
                        <div>
                            <Typography variant="h7" className={classes.title}>
                                {authContext.user.name}
                            </Typography>
                        </div>
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={viewProfile}>Profile</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
            <div className={classes.root}>
                <Grid container direction="row">
                    <CriteriaCard number="1" firstPart="Vision, Mission and" secondPart="Program Educational Objectives" history={props.history} />
                    <CriteriaCard number="2" firstPart="Program Curriculum and" secondPart="Teaching Learning Process" history={props.history} />
                    <CriteriaCard number="3" firstPart="Course Outcomes and" secondPart="Program Outcomes" history={props.history} />
                    <CriteriaCard number="4" firstPart="Student Performance" secondPart="" history={props.history} />
                    <CriteriaCard number="5" firstPart="Faculty Information and" secondPart="Contribution" history={props.history} />
                    <CriteriaCard number="6" firstPart="Facilities and" secondPart="Technical Support" history={props.history} />
                    <CriteriaCard number="7" firstPart="Continuous Improvement" secondPart="" history={props.history} />
                    <CriteriaCard number="8" firstPart="First Year Academics" secondPart="" history={props.history} />
                    <CriteriaCard number="9" firstPart="Student Support Systems" secondPart="" history={props.history} />
                    <CriteriaCard number="10" firstPart="Governance, Institutional Support" secondPart="and Financial Resources" history={props.history} />
                </Grid>
            </div>
        </div>
    );
}

export default withRouter(Department);