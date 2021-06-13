import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { withRouter } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: '#00003a'
    },
    title: {
        flexGrow: 1,
    }
}));

function Navbar(props) {
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

    const viewDepartment = () => {
        props.history.push(`/${props.path}`);
    }

    const viewCoordinatorPanel = () => {
        props.history.push('/coordinator');
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        {authContext.user.department}
                    </Typography>
                    <div>
                        <Typography className={classes.name}>
                            {authContext.user.name}
                        </Typography>
                    </div>
                    <div>
                        <IconButton
                            aria-label="menu for user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <MenuIcon />
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
                            <MenuItem onClick={viewDepartment}>{props.path === "department" ? "Department" : "Profile"}</MenuItem>
                            {authContext.user.isCoordinator ? <MenuItem onClick={viewCoordinatorPanel}>Co-ordinator Panel</MenuItem> : null}
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withRouter(Navbar);