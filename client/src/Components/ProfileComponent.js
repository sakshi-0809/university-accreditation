import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { withRouter } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import Container from '@material-ui/core/Container';

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
    paper: {
        marginTop: theme.spacing(17),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        minWidth: '100%',
    },
    changePassword: {
        width: '100%',
        marginTop: theme.spacing(3),
    }
}));

function NavBar(props) {
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
        props.history.push('/department');
    }

    return (
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
                            <MenuItem onClick={viewDepartment}>Department</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

function EditProfile(props) {
    const classes = useStyles();
    const authContext = useContext(AuthContext);
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [name, setName] = useState('');
    const [changePassword, setChangePassword] = useState(false);
    const [isValid, setIsValid] = useState({ value: true, msg: '' });
    const [message, setMessage] = useState('');
    const [saveError, setSaveError] = useState(false);

    const handleSubmit = (e) => {
        const user = {
            name: name,
            address: address,
            phone: phone,
            password: newPassword,
            changePassword: changePassword,
            email: authContext.user.email
        }

        console.log("Submitted");

        e.preventDefault();

        fetch('/changeprofile', {
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => data.json()).then(data => {
                setSaveError(data.message.msgError);
                setMessage(data.message.msgBody);
                setName('');
                setConfirmNewPassword('');
                setNewPassword('');
                setPhone('');
                setAddress('');
            });
    }

    const handleChange = (e) => {
        if (e.target.name === "name") {
            setName(e.target.value);
        } else if (e.target.name === "phone") {
            setPhone(e.target.value);
        } else if (e.target.name === "address") {
            setAddress(e.target.value);
        } else if (e.target.name === "changePassword") {
            if (e.target.value === "yes") {
                setChangePassword(true);
            } else {
                setChangePassword(false);
            }
        }
    }
    const getPassword = (value1, value2) => {
        setNewPassword(value1);
        setConfirmNewPassword(value2)
    }

    const ErrorText = (props) => {
        if (props.isValid.value === true) {
            return (<div></div>);
        } else {
            return (
                <Alert severity="error">{props.isValid.msg}</Alert>
            )
        }
    }

    const ErrorMessage = (props) => {
        if (props.saveError === true) {
            return (
                <Alert severity="error">{props.message}</Alert>
            );
        } else if (props.saveError === false && props.message !== '') {
            return (
                <Alert severity="success">{props.message}</Alert>
            )
        } else {
            return (<div></div>);
        }
    }

    const ChangePassword = (props) => {
        const [newPassword, setNewPassword] = useState();
        const [confirmNewPassword, setConfirmNewPassword] = useState();

        useEffect(() => {
            setNewPassword(props.newPassword);
            setConfirmNewPassword(props.confirmNewPassword);
        }, [props])

        const handleBlur = (e => {
            props.getPassword(newPassword, confirmNewPassword);

            validate(e.target.name, e.target.value)
            e.target.addEventListener('change', (e) => {
                validate(e.target.name, e.target.value)
            })
        })

        const validate = (type, value) => {
            if (type === "confirmNewPassword") {
                if (value !== newPassword) {
                    setIsValid({ value: false, msg: "Password Does Not Match" })
                    return false;
                }
                else {
                    setIsValid({ value: true, msg: "" })
                    return true;
                }
            }
        }

        const handleChange = (e) => {
            if (e.target.name === "newPassword") {
                setNewPassword(e.target.value);
            } else if (e.target.name === "confirmNewPassword") {
                setConfirmNewPassword(e.target.value)
            }
        }

        if (props.changePassword === false) {
            return (<div></div>);
        } else {
            return (
                <>
                    <Grid item xs={12}>
                        <TextField
                            required
                            variant="filled"
                            fullWidth
                            name="newPassword"
                            label="New Password"
                            type="password"
                            id="newPassword"
                            onChange={handleChange}
                            value={newPassword}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            variant="filled"
                            fullWidth
                            name="confirmNewPassword"
                            label="Confirm New Password"
                            type="password"
                            id="confirmNewPassword"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={confirmNewPassword}
                        />
                    </Grid>
                </>
            )
        }
    }

    return (
        <div className="form-page">
            <div>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Edit Profile
                            </Typography>
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        name="name"
                                        variant="filled"
                                        fullWidth
                                        id="name"
                                        label="Name"
                                        onChange={handleChange}
                                        value={name}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        disabled
                                        variant="filled"
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        value={authContext.user.email}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="filled"
                                        fullWidth
                                        id="phone"
                                        label="Phone Number"
                                        name="phone"
                                        onChange={handleChange}
                                        value={phone}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="filled"
                                        fullWidth
                                        id="address"
                                        label="Address"
                                        name="address"
                                        onChange={handleChange}
                                        value={address}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        disabled
                                        variant="filled"
                                        fullWidth
                                        id="department"
                                        label="Department"
                                        name="department"
                                        value={authContext.user.department}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Want to change password?</FormLabel>
                                        <RadioGroup aria-label="changePassword" name="changePassword" onChange={handleChange}>
                                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="no" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>

                                <ChangePassword changePassword={changePassword} getPassword={getPassword} newPassword={newPassword} confirmNewPassword={confirmNewPassword}></ChangePassword>

                                <Grid item xs={12}>
                                    <ErrorText isValid={isValid}></ErrorText>
                                </Grid>

                                <Grid item xs={12}>
                                    <ErrorMessage message={message} saveError={saveError}></ErrorMessage>
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Save Changes
                            </Button>
                        </form>
                    </div>
                </Container>
            </div>
        </div>
    )
}

function Profile(props) {
    return (
        <div>
            <NavBar history={props.history} />
            <EditProfile />
        </div>
    )
}

export default withRouter(Profile);